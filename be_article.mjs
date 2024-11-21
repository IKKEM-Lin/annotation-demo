import path from "path";
import fs from "fs";
import { JSONFilePreset } from "lowdb/node";

// if not exits, copy the default user from data_example/article.json
if (!fs.existsSync(path.resolve("data", "articles.json"))) {
  fs.copyFileSync(
    path.resolve("data_example", "articles.json"),
    path.resolve("data", "articles.json")
  );
}

const db = await JSONFilePreset(
  path.resolve("data", "articles.json"),
  "{}"
);

const getArticles = async () => {
  return await db.data;
};

const getArticleAssignToUser = async (username) => {
    const articles = await db.data;
    return Object.entries(articles).filter(([doi, article]) => article.assignee === username);
};

const updateArticleAssignee = async (doi, assignee) => {
    const articles = await db.data;
    if (!articles[doi]) {
        throw new Error("Article not found");
    }
    articles[doi].assignee = assignee;
    await db.write(articles);
};

const getArticleAssignee = async (doi) => {
    const articles = await db.data;
    if (!articles[doi]) {
        throw new Error("Article not found");
    }
    return articles[doi].assignee;
};

export { getArticles, updateArticleAssignee, getArticleAssignee, getArticleAssignToUser };