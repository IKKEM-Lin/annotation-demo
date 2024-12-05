import path from "path";
import fs from "fs";

// 保存 JSON 文件的目录
const uploadDirectory = path.resolve("data", "result");

// 确保上传目录存在
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}


const uploadJSON = async (data, article, username) => {
  // 为保存的 JSON 文件生成一个唯一的文件名
  const filename = `${Date.now()}.json`;

  const currentUserDirectory = path.join(uploadDirectory, username);
  if (!fs.existsSync(currentUserDirectory)) {
    fs.mkdirSync(currentUserDirectory);
  }
  const userFileDirectory = path.join(currentUserDirectory, article);
  if (!fs.existsSync(userFileDirectory)) {
    fs.mkdirSync(userFileDirectory);
  }
  const filePath = path.join(userFileDirectory, filename);

  // 将数据写入 JSON 文件
  fs.writeFileSync(filePath, JSON.stringify(data));
  return filename;
};

const getUserLatestUploads = async (username) => {
  const currentUserDirectory = path.join(uploadDirectory, username);
  if (!fs.existsSync(currentUserDirectory)) {
    return [];
  }
  const articles = fs.readdirSync(currentUserDirectory);
  const result = {};
  // 返回用户上传的所有文件名,文件夹结构为：data/result/{username}/{article}/{username}-{timestamp}.json。返回的结构为：[{article: 最新的时间戳.json}]
  articles.forEach((article) => {
    const articleDirectory = path.join(currentUserDirectory, article);
    const files = fs.readdirSync(articleDirectory);
    // 通过文件名{username}-{timestamp}.json排序，取timestamp最新的文件
    const latestFile = files.sort().reverse()[0];
    result[article]={latestFile};
  });
  return result;
}

const getJSON = async (username, article, filename) => {
  const filePath = path.join(uploadDirectory, username, article, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export { uploadJSON, getUserLatestUploads, getJSON };
