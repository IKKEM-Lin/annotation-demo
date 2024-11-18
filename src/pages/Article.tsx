/* eslint-disable @typescript-eslint/no-explicit-any */
// import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable, ProTableProps } from "@ant-design/pro-components";
// import { Button, Popconfirm, Tooltip } from "antd";
import { useRef } from "react";
import { OtherEndpointsService } from "../services/service";
// import { components } from "../services/api-type";
// import { waitTime } from "../util";
// import { URL_SEARCH } from "../constant";
import { Link } from "react-router-dom";

const columns: ProColumns<any>[] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 48,
    hideInSearch: true,
    render: (text) => {
        return text ? (
        <Link to={`/article/${text}`}>{text}</Link>
        ) : (
        "-"
        );
    },
  },
//   {
//     title: "TITLE",
//     dataIndex: "title",
//     copyable: true,
//     ellipsis: true,
//     hideInSearch: true,
//   },
//   {
//     title: "Article ID",
//     key: "article_id",
//     dataIndex: "article_id",
//     // hideInSearch: true,
//     render: (text) => {
//       return text ? (
//         <Link to={`/chem-brain/article-overview/${text}`}>{text}</Link>
//       ) : (
//         "-"
//       );
//     },
//   },
];

const tableRequest: ProTableProps<any, any>["request"] = async () => {
  //   console.log(params, sort, filter);
//   await waitTime(500);
//   const { current, pageSize, article_id } = params;
  const res = await OtherEndpointsService.getArticles();
  return {
    data: res.map(item => ({id: item})),
    success: true,
  };
};

const Article = () => {
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

export default Article;
