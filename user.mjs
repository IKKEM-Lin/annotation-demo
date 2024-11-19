import path from "path";
import fs from "fs";
import crypto from "crypto";
import { JSONFilePreset } from "lowdb/node";

function _generateSalt(length = 16) {
  return crypto.randomBytes(length).toString("hex");
}

function _hashPassword(password, salt) {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest("hex");
}

function verifyPassword(inputPassword, storedSalt, storedHash) {
  const inputHashedPassword = _hashPassword(inputPassword, storedSalt);
  return inputHashedPassword === storedHash;
}

const getDefaultUser = () => {
  const salt = _generateSalt();
  const password = _hashPassword("admin", salt);
  return JSON.stringify({
    admin: {
      username: "admin",
      password,
      salt,
      isDelete: false,
    },
  });
};

// if not exits, create default user
if (!fs.existsSync(path.resolve("data", "user.json"))) {
  fs.writeFileSync(path.resolve("data", "user.json"), getDefaultUser());
}

const db = await JSONFilePreset(
  path.resolve("data", "user.json"),
  getDefaultUser()
);

const addUser = async (username, password) => {
  const user = await db.data;
  if (user[username]) {
    throw new Error("User already exists");
  }
  const salt = _generateSalt();
  user[username] = {
    username,
    password: _hashPassword(password, salt),
    salt,
    isDelete: false,
    role: "user",
  };
  await db.write(user);
};

const deleteUser = async (username) => {
  const user = await db.data;
  if (!user[username]) {
    throw new Error("User does not exist");
  }
  if (user[username].isDelete) {
    throw new Error("User has been deleted");
  }
  // is admin
  if (username === "admin") {
    throw new Error("Cannot delete admin user");
  }
  user[username].isDelete = true;
  await db.write(user);
};

const updateUser = async (username, oldPass, newPass) => {
  const user = await db.data;
  if (!user[username]) {
    throw new Error("User does not exist");
  }
  if (user[username].isDelete) {
    throw new Error("User has been deleted");
  }
  const isPasswordCorrect = verifyPassword(
    oldPass,
    user[username].salt,
    user[username].password
  );
  if (!isPasswordCorrect) {
    throw new Error("Password is incorrect");
  }
  user[username].password = _hashPassword(newPass, user[username].salt);
  await db.write(user);
};

const resetPassword = async (username, newPass) => {
  const user = await db.data;
  if (!user[username]) {
    throw new Error("User does not exist");
  }
  if (user[username].isDelete) {
    throw new Error("User has been deleted");
  }
  user[username].password = _hashPassword(newPass, user[username].salt);
  await db.write(user);
};

const listUser = async () => {
  const user = await db.data;
  return Object.keys(user).filter((username) => !user[username].isDelete);
};

const getUser = async (username) => {
  const user = await db.data;
  if (!user[username]) {
    throw new Error("User does not exist");
  }
  if (user[username].isDelete) {
    throw new Error("User has been deleted");
  }
  const { salt, password, ...others } = user[username];
  return others;
};

const validateUser = async (username, password) => {
  const user = await db.data;
  if (!user[username]) {
    throw new Error("User does not exist");
  }
  if (user[username].isDelete) {
    throw new Error("User has been deleted");
  }
  return verifyPassword(password, user[username].salt, user[username].password);
};

export {
  addUser,
  deleteUser,
  updateUser,
  listUser,
  getUser,
  validateUser,
  resetPassword,
};
