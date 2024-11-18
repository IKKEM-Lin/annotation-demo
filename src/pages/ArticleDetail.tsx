/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudUploadOutlined } from "@ant-design/icons";
// import type { ActionType } from "@ant-design/pro-components";
import { Button, Flex, message } from "antd";
// import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import HighlightExample from "../PdfReviewer";
import { OtherEndpointsService } from "../services/service";

// const downloadFile = (data: string, fileName: string) => {
//   const a = document.createElement("a");
//   // document.body.appendChild(a);
//   // a.style = "display: none";
//   const blob = new Blob([data], {
//     type: "application/octet-stream",
//   });
//   const url = window.URL.createObjectURL(blob);
//   a.href = url;
//   a.download = fileName;
//   a.click();
//   window.URL.revokeObjectURL(url);
// };

const ArticleDetail = () => {
  //   const actionRef = useRef<ActionType>();
  const params = useParams();
  //   const [URLSearchParams, _] = useSearchParams();
  //   const { state } = useLocation();
  //   useEffect(() => {
  //     if (state?.reload === false) return;
  //     if (location.search === "") {
  //       actionRef.current?.reload();
  //     }
  //   }, [URLSearchParams]);
  if (!params.id) {
    return <div>Article not found</div>;
  }
  return (
    <>
      <Flex justify="end">
        <Button
          icon={<CloudUploadOutlined style={{fontSize: "20px"}} />}
          type="primary"
          size="large"
          onClick={async () => {
            const data = localStorage.getItem("reactions") || "";
            await OtherEndpointsService.uploadAnnotationData(params.id || "", data);
            message.success("Upload success");
          }}
        >
          Upload
          
        </Button>
      </Flex>
      <HighlightExample fileUrl={`/articles/${params.id}`} />
    </>
  );
};

export default ArticleDetail;
