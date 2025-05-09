/* eslint-disable @typescript-eslint/no-explicit-any */
// import { components } from "./api-type";
import request, { IPromise } from "./request";

export const UserEndpointsService = {
  addUser: (payload: { username: string; password: string }): IPromise<any> =>
    request(`/api/users`, {
      method: "post",
      body: payload,
      showErrorMessage: true,
    }),
  deleteUser: (id: string): IPromise<any> => request(`/api/users/${id}`, { method: "delete" }),
  updateUser: (id: string, payload: { username: string; password: string }): IPromise<any> =>
    request(`/api/users/${id}`, {
      method: "put",
      body: payload,
    }),
  getUsers: (): IPromise<string[]> => request(`/api/users`, { method: "get" }),
  resetPassword: (payload: { username: string; newPass: string }): IPromise<any> => request(`/api/reset-password`, { method: "put", body: payload }),
};

export const FileEndpointsService = {
  getUploadFiles: (): IPromise<Record<string, {assignee: string; latestFile: string;}>> => request(`/api/upload-json`, { method: "get" }),
  getUploadFile: (article: string, filename: string): IPromise<any> => request(`/api/upload-json/${article}/${filename}`, { method: "get" }),
  uploadAnnotationData: (filename:string, payload: any): IPromise<{message: string; filePath: string}> => request(`/api/upload-json?file=${filename}`, { method: "post", body: payload }),
}


export const OtherEndpointsService = {
  login: (payload: { username: string; password: string }): IPromise<{token: string}> => request(`/api/login`, { method: "post", body: payload }),
  getArticles: (): IPromise<Record<string, {title: string; publication: string; assignee?: string}>> => request(`/api/articles`, { method: "get" }),
  assignArticle: (doi: string): IPromise<any> => request(`/api/articles/${doi}/assignee`, { method: "put", body: {} }),
  unassignArticle: (doi: string): IPromise<any> => request(`/api/articles/${doi}/assignee`, { method: "delete" }),
}