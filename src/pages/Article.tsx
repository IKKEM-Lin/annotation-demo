/* eslint-disable @typescript-eslint/no-explicit-any */
// import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, ProTableProps } from "@ant-design/pro-components";
// import { Button, Popconfirm, Tooltip } from "antd";
import { useRef, useState } from "react";
import { OtherEndpointsService } from "../services/service";
// import { components } from "../services/api-type";
// import { waitTime } from "../util";
// import { URL_SEARCH } from "../constant";
import { Link } from "react-router-dom";
import { Button, Flex, message } from "antd";
import { userinfo } from "../valtio";
import { useSnapshot } from "valtio";


const Article = () => {
  const actionRef = useRef<ActionType>();
  const [Loading, setLoading] = useState(false);
  const user = useSnapshot(userinfo);

  const tableRequest: ProTableProps<any, any>["request"] = async () => {
    //   console.log(params, sort, filter);
    //   await waitTime(500);
    //   const { current, pageSize, article_id } = params;
    setLoading(true);
    const res = await OtherEndpointsService.getArticles();
    setLoading(false);
    const dois = Object.keys(res);
    return {
      data: dois.map((doi) => ({
        doi,
        title: res[doi].title,
        publication: res[doi].publication,
        assign: res[doi].assignee,
      })),
      success: true,
    };
  };
  const columns: ProColumns<any>[] = [
    {
      title: "DOI",
      dataIndex: "doi",
      width: 280,
      hideInSearch: true,
      render: (text) => {
        return text ? (
          <Link target="_blank" to={`https://doi.org/${(text as any).replace(/(10.\d+)_/, "$1/")}`}>
            {(text as any).replace(/(10.\d+)_/, "$1/")}
          </Link>
        ) : (
          "-"
        );
      },
    },
    {
      title: "TITLE",
      dataIndex: "title",
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "Operation",
      dataIndex: "assign",
      hideInSearch: true,
      render: (text, record) => {
        console.log(text);
        const isAssigned = !!text && text !== "-";
        const isOwner = text === user.data?.username;
        return (
          <Flex>
            <Button
              disabled={isAssigned && !isOwner}
              type={"link"}
              color={isAssigned ? "danger" : "primary"}
              onClick={async () => {
                try {
                  setLoading(true);
                  if (isAssigned) {
                    await OtherEndpointsService.unassignArticle(
                      record.doi.replace("/", "_")
                    );
                    message.success("Give up task success");
                  } else {
                    await OtherEndpointsService.assignArticle(
                      record.doi.replace("/", "_")
                    );
                    message.success("Get task success");
                  }
                  actionRef.current?.reload();
                } catch (error: any) {
                  console.error(error);
                  message.error("Error: ", error.message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {isAssigned ? "Give up task" : "Get task"}
            </Button>
          </Flex>
        );
      },
    },
  ];
  return (
    <ProTable<any>
      columns={columns}
      actionRef={actionRef}
      pagination={false}
      toolBarRender={false}
      loading={Loading}
      request={tableRequest}
      columnsState={{
        persistenceKey: "pro-table-snippet",
        persistenceType: "localStorage",
        onChange() {
          // console.log("value: ", value);
        },
      }}
      rowKey="id"
      search={false}
      options={{
        fullScreen: false,
        setting: false,
      }}
      dateFormatter="string"
      headerTitle=""
    />
  );
};

export default Article;
