/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudUploadOutlined } from "@ant-design/icons";
// import type { ActionType } from "@ant-design/pro-components";
import { Button, Flex, message } from "antd";
// import { useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import HighlightExample from "../PdfReviewerV2";
import { FileEndpointsService } from "../services/service";
import { useEffect, useState } from "react";

const ArticleDetail = () => {
  const [data, setData] = useState<any[]>();
  const params = useParams();
  const [URLSearchParams] = useSearchParams();
  //   const { state } = useLocation();
  useEffect(() => {
    const lastVersion = URLSearchParams.get("v");
    if (!lastVersion) {
      setData([]);
      return;
    }
    (async () => {
      try {
        const res = await FileEndpointsService.getUploadFile(
          params.id || "",
          lastVersion || ""
        );
        setData(res);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    })();
  }, [URLSearchParams]);
  if (!params.id) {
    return <div>Article not found</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Flex justify="end">
        <Button
          icon={<CloudUploadOutlined style={{ fontSize: "20px" }} />}
          type="primary"
          size="large"
          onClick={async () => {
            const data = localStorage.getItem("reactions") || "";
            const res = await FileEndpointsService.uploadAnnotationData(
              params.id || "",
              data
            );
            const filename = res.filePath.split("/").pop();
            window.history.replaceState({}, "", `/articles/${params.id}?v=${filename}`);
            message.success("Upload success");
          }}
        >
          Upload
        </Button>
      </Flex>
      <HighlightExample initialReactions={data} fileUrl={`/articles/${params.id}`} />
    </>
  );
};

export default ArticleDetail;
