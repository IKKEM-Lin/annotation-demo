import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import path from "path";
import fs from "fs";
import JWT from "jsonwebtoken";
import hapiAuthJWT from "hapi-auth-jwt2";
import {
  validateUser,
  getUser,
  listUser,
  updateUser,
  deleteUser,
  addUser,
  resetPassword,
} from "./user.mjs";
import { uploadJSON, getJSON, getUserLatestUploads } from "./annotation.mjs";

const getArticles = () => {
  const publicDir = path.resolve("public", "articles");
  let fileNames = [];

  try {
    fileNames = fs.readdirSync(publicDir);
  } catch (err) {
    console.error(err);
  }
  return fileNames;
};

const fileNames = getArticles();

// node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
const JWt_SECRET =
  "3ThRmJaP/b0Mh8NZSzuIgiU+Kyonc4G0n68mLS7ACPadGWN3fYFjtuIZJj2F3HRdN39LC4K1pbFIDqsDFIH4/zT4hfrRGytgjNPB4nmh6Wq5k0EgFfUgGwzMTbQCQzR/6DqY2cwrLpTUE+UBr4RiRn015m4JPhDtbDNbIrb4vElHAu/aVjCaeBd8KOozH0vkfeOUgDVxU4YFOIlaU16lEh3dTv429Iu1Rd0rRZLRDerpFgCZ0ECRO3iapfF1eCWHlSAkPsquGpDVcl2xm4ch5o9D0QeCJm5N/9reN4hrjSC+jKDO5zlOlSAD3javt7kylR4Gvk3mx7ApSgq9sCL9pA==";

const validate = async function (decoded, request, h) {

  const user = await getUser(decoded.username);
  if (!user || user.isDelete) {
    return { isValid: false };
  }
  if (Date.now() / 1000 - decoded.iat > 7 * 24 * 60 * 60) {
    return { isValid: false };
  }
  return { isValid: true };
};

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
  });

  await server.register(Inert);
  await server.register(hapiAuthJWT);
  // see: https://hapi.dev/api/#-serverauthschemename-scheme
  server.auth.strategy("jwt", "jwt", {
    key: JWt_SECRET,
    validate,
    verifyOptions: { ignoreExpiration: true },
  });

  server.auth.default("jwt");

  // 用户相关接口
  server.route([{
    method: "GET",
    path: "/api/users",
    handler: async (request, h) => {
      const currentUser = request.auth.credentials;
      if (currentUser.role !== "admin") {
        return h.response({ message: "Permission denied" }).code(403);
      }
      // console.log(user);
      const users = await listUser();
      return h.response(users);
    },
  }, {
    method: "POST",
    path: "/api/users",
    handler: async (request, h) => {
      const currentUser = request.auth.credentials;
      if (currentUser.role !== "admin") {
        return h.response({ message: "Permission denied" }).code(403);
      }
      const { username, password } = request.payload;
      try {
        await addUser(username, password);
        return h.response({ message: "User added" });
      } catch (err) {
        return h.response({ message: err.message }).code(400);
      }
    },
  }, {
    method: "PUT",
    path: "/api/users/{username}",
    handler: async (request, h) => {
      const currentUser = request.auth.credentials;
      if (currentUser.role !== "admin") {
        return h.response({ message: "Permission denied" }).code(403);
      }
      const { username } = request.params;
      const { oldPass, newPass } = request.payload;
      try {
        await updateUser(username, oldPass, newPass);
        return h.response({ message: "User updated" });
      } catch (err) {
        return h.response({ message: err.message }).code(400);
      }
    },
  }, {
    method: "DELETE",
    path: "/api/users/{username}",
    handler: async (request, h) => {
      const currentUser = request.auth.credentials;
      if (currentUser.role !== "admin") {
        return h.response({ message: "Permission denied" }).code(403);
      }
      const { username } = request.params;
      try {
        await deleteUser(username);
        return h.response({ message: "User deleted" });
      } catch (err) {
        return h.response({ message: err.message }).code(400);
      }
    },
  }, {
    method: "PUT",
    path: "/api/reset-password",
    handler: async (request, h) => {
      const currentUser = request.auth.credentials;
      const { username, newPass } = request.payload;
      if (currentUser.role !== "admin" && username === 'admin') {
        return h.response({ message: "Permission denied" }).code(403);
      }
      try {
        await resetPassword(username, newPass);
        return h.response({ message: "Password reset" });
      } catch (err) {
        return h.response({ message: err.message }).code(400);
      }
    }
  }])

  server.route({
    method: "GET",
    path: "/api/articles",
    handler: (request, h) => {
      return h.response(fileNames);
    },
  });

  server.route([{
    method: "POST",
    path: "/api/upload-json",
    options: {
      // 设置请求体解析为 JSON
      payload: {
        parse: true, // 解析请求体为 JSON
        allow: "application/json", // 限制只接受 JSON 类型的请求
      },
    },
    handler: async (request, h) => {
      try {
        const data = request.payload; // 获取 JSON 数据
        // 获取路径参数file
        const { file } = request.query;
        const currentUser = request.auth.credentials;

        if (!data) {
          return h.response({ message: "No JSON data received" }).code(400);
        }

        const savePath = uploadJSON(data, file, currentUser.username);

        return h
          .response({
            message: "JSON data received and saved",
            filePath: savePath,
          })
          .code(200);
      } catch (err) {
        console.error("Error processing JSON data:", err);
        return h.response({ message: "Internal Server Error" }).code(500);
      }
    },
  },{
    method: "GET",
    path: "/api/upload-json",
    handler: async (request, h) => {
      const currentUser = request.auth.credentials;
      const result = await getUserLatestUploads(currentUser.username);
      return h.response(result);
    },
  }, {
    method: "GET",
    path: "/api/upload-json/{article}/{filename}",
    handler: async (request, h) => {
      const currentUser = request.auth.credentials;
      const { article, filename } = request.params;
      const data = await getJSON(currentUser.username, article, filename);
      if (!data) {
        return h.response({ message: "File not found" }).code(404);
      }
      return h.response(data);
    },
  }]);

  // 登录
  server.route({
    method: "POST",
    path: "/api/login",
    options: {
      auth: false,
      payload: {
        parse: true,
        allow: "application/json",
      },
    },
    handler: async (request, h) => {
      const { username, password } = request.payload;
      const isValid = await validateUser(username, password);
      if (isValid) {
        const user = await getUser(username);
        return h.response({
          token: JWT.sign({...user}, JWt_SECRET),
        });
      } else {
        return h.response({ message: "Invalid credentials" }).code(401);
      }
    },
  });

  await server.start();

  console.log("Server running at:", server.info.uri);
};

start();
