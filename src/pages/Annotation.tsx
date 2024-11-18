/* eslint-disable @typescript-eslint/no-explicit-any */
// import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, ProTableProps } from "@ant-design/pro-components";
// import { Button, Popconfirm, Tooltip } from "antd";
import { useRef } from "react";
import { FileEndpointsService } from "../services/service";
// import { components } from "../services/api-type";
// import { waitTime } from "../util";
// import { URL_SEARCH } from "../constant";
import { Link } from "react-router-dom";

const columns: ProColumns<any>[] = [
  {
    title: "Article",
    dataIndex: "article",
    // width: 48,
    hideInSearch: true,
    render: (text, record) => {
        return text ? (
        <Link to={`/article/${text}?v=${record.filename}`}>{text}</Link>
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
];

const tableRequest: ProTableProps<any, any>["request"] = async () => {
  //   console.log(params, sort, filter);
//   await waitTime(500);
//   const { current, pageSize, article_id } = params;
  const res = await FileEndpointsService.getUploadFiles();
  return {
    data: res.map(item => {
      const article = Object.keys(item)[0];
      const filename = item[article];
      const updateTime = new Date(+filename.split(".")[0]).toLocaleString();
      return {article: article, updateTime, filename};
    }),
    success: true,
  };
};

const Annotation = () => {
  const actionRef = useRef<ActionType>();
  // const [URLSearchParams, _] = useSearchParams();
  // const { state } = useLocation();
  // useEffect(() => {
  //   if (state?.reload === false) return;
  //   if (location.search === "") {
  //     actionRef.current?.reload();
  //   }
  // }, [URLSearchParams]);
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
