/* eslint-disable @typescript-eslint/no-explicit-any */
// import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, ProTableProps } from "@ant-design/pro-components";
// import { Button, Popconfirm, Tooltip } from "antd";
import { useRef } from "react";
import { FileEndpointsService, OtherEndpointsService } from "../services/service";
// import { components } from "../services/api-type";
// import { waitTime } from "../util";
// import { URL_SEARCH } from "../constant";
import { Link } from "react-router-dom";
import { Button, message, Popconfirm, Tooltip } from "antd";
import { MinusOutlined } from "@ant-design/icons";

const tableRequest: ProTableProps<any, any>["request"] = async () => {
  //   console.log(params, sort, filter);
  //   await waitTime(500);
  //   const { current, pageSize, article_id } = params;
  const res = await FileEndpointsService.getUploadFiles();
  const data = Object.keys(res).map((article) => {
    const fileName = res[article]?.latestFile;
    const updateTime =
      fileName && new Date(+fileName.split(".")[0]).toLocaleString();
    return { doi: article, filename: fileName, updateTime };
  });
  return {
    data: data,
    success: true,
  };
};

const Annotation = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<any>[] = [
    {
      title: "DOI",
      dataIndex: "doi",
      // width: 48,
      hideInSearch: true,
      render: (text, record) => {
        return text ? (
          <Tooltip title="Click to Start Annotation">
            <Link to={`/article/${text}.pdf?v=${record.filename || ""}`}>
              {text}
            </Link>
          </Tooltip>
        ) : (
          "-"
        );
      },
    },
    {
      title: "Update Time",
      dataIndex: "updateTime",
      hideInSearch: true,
    },
    {
      title: "Operation",
      dataIndex: "assign",
      hideInSearch: true,
      width: 240,
      render: (text, record) => {
        return (
          <Popconfirm
            title="Confirm your operation?"
            cancelText="No"
            okText="Yes"
            onConfirm={async () => {
              try {
                await OtherEndpointsService.unassignArticle(
                  record.doi.replace("/", "_")
                );
                message.success("Give up task success");
                actionRef.current?.reload();
              } catch (error: any) {
                console.error(error);
                message.error("Error: ", error.message);
              }
            }}
          >
            <Button
              type={"link"}
              style={{ color: "#f81d22" }}
              icon={<MinusOutlined />}
            >
              {"Give up task"}
            </Button>
          </Popconfirm>
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

export default Annotation;
