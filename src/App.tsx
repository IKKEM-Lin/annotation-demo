import { CloudDownloadOutlined } from "@ant-design/icons";
import HighlightExample from "./PdfReviewer";
import { Tooltip } from "antd";

const downloadFile = (data: string, fileName: string) => {
  const a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style = "display: none";
  const blob = new Blob([data], {
    type: "application/octet-stream",
  });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

function App() {
  return (
    <>
      <h1>
        PDF标注Demo{" "}
        <Tooltip title="Download reaction data">
          <CloudDownloadOutlined
            style={{ color: "#1677ff" }}
            onClick={() => {
              const data = localStorage.getItem("reactions") || "";
              downloadFile(data, "reactions.json");
            }}
          />
        </Tooltip>
      </h1>
      <HighlightExample fileUrl={`/b.pdf`} />
    </>
  );
}

export default App;
