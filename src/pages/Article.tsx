/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProColumns } from "@ant-design/pro-components";
import {
  ProFormSelect,
  ProFormText,
  ProTable,
  QueryFilter,
} from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { OtherEndpointsService } from "../services/service";
import { Link } from "react-router-dom";
import { Button, Flex, message, Popconfirm, Space, Tooltip } from "antd";
import { userinfo } from "../valtio";
import { useSnapshot } from "valtio";
import {
  ExportOutlined,
  MinusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {options} from "../component/StatusSelection";

const Article = () => {
  const [Loading, setLoading] = useState(false);
  const user = useSnapshot(userinfo);
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState<any>({});

  const fetchData = async () => {
    setLoading(true);
    const res = await OtherEndpointsService.getArticles();
    setLoading(false);
    const dois = Object.keys(res);
    const data = dois.map((doi) => ({
      doi,
      title: res[doi].title,
      publication: res[doi].publication,
      assign: res[doi].assignee,
      status: res[doi].status || "",
    }));
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ProColumns<any>[] = [
    {
      title: "DOI",
      dataIndex: "doi",
      width: 280,
      hideInSearch: true,
      render: (text) => {
        const linkUrl = `https://doi.org/${(text as any).replace(
          /(10.\d+)_/,
          "$1/"
        )}`;
        return text ? (
          <Space>
            {(text as any).replace(/(10.\d+)_/, "$1/")}
            <Tooltip title="View paper source in new tab.">
              <Link target="_blank" to={linkUrl}>
                <ExportOutlined />
              </Link>
            </Tooltip>
          </Space>
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
      title: "Status",
      dataIndex: "status",
      hideInSearch: true,
      render: (_, record) => {
        const item = options?.find((item) => item.value === record.status);
        return item?.label || ""
      },
    },
    {
      title: "Operation",
      dataIndex: "assign",
      hideInSearch: true,
      width: 240,
      render: (text, record) => {
        const isAssigned = !!text && text !== "-";
        const isOwner = text === user.data?.username;
        return (
          <Flex>
            <Popconfirm
              title="Confirm your operation?"
              cancelText="No"
              okText="Yes"
              onConfirm={async () => {
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
                  await fetchData();
                } catch (error: any) {
                  console.error(error);
                  message.error("Error: ", error.message);
                  setLoading(false);
                }
              }}
            >
              <Button
                disabled={isAssigned && !isOwner}
                type={"link"}
                // color={isAssigned ? "danger" : "primary"}
                style={{ color: isAssigned && isOwner ? "#f81d22" : "" }}
                onClick={async () => {}}
                icon={isAssigned ? <MinusOutlined /> : <PlusCircleOutlined />}
              >
                {isAssigned ? "Give up task" : "Get task"}
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];
  return (
    <>
      <QueryFilter
        onValuesChange={(changeValues) => {
          setFilter({ ...filter, ...changeValues });
        }}
        span={6}
        defaultCollapsed={false}
        optionRender={false}
      >
        <ProFormText name="doi" label="DOI" initialValue="" />
        <ProFormText name="title" label="Title" initialValue="" />
        <ProFormSelect
          name="type"
          label="Type"
          request={async () => [
            { label: "All", value: "all" },
            { label: "Available", value: "available" },
            { label: "My task", value: "myTask" },
          ]}
          initialValue="all"
        />
      </QueryFilter>
      <ProTable<any>
        columns={columns}
        // actionRef={actionRef}
        dataSource={data.filter((item) => {
          const { doi, title, type } = filter;
          const doiTrim = doi?.trim();
          const titleTrim = title?.trim();
          if (doiTrim && !item.doi.includes(doiTrim)) {
            return false;
          }
          if (titleTrim && !item.title.includes(titleTrim)) {
            return false;
          }
          if (type === "available" && item.assign) {
            return false;
          }
          if (
            type === "myTask" &&
            (!item.assign || item.assign !== user.data?.username)
          ) {
            return false;
          }
          return true;
        })}
        pagination={false}
        toolBarRender={false}
        loading={Loading}
        // request={tableRequest}
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
    </>
  );
};

export default Article;
