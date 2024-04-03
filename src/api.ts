import {
  User,
  FolderResponse,
  FoldersResponse,
  FolderLinksResponse,
} from "../src/types/interface";

const BASE_URL = "https://bootcamp-api.codeit.kr/api";

export async function getUser(): Promise<User> {
  const response = await fetch(`${BASE_URL}/sample/user`);
  const body = await response.json();
  return body;
}

export async function getFolder(): Promise<FolderResponse> {
  const response = await fetch(`${BASE_URL}/sample/folder`);
  const body = await response.json();
  return body;
}

export async function getFolders(): Promise<FoldersResponse> {
  const userId = 1;
  const response = await fetch(`${BASE_URL}/users/${userId}/folders`);
  const body = await response.json();
  return body;
}

export async function getFolderLinks(
  id: number | null
): Promise<FolderLinksResponse> {
  const userId = 1;
  const folderId = id ? +id : null;
  const url = `${BASE_URL}/users/${userId}/links${
    folderId ? `?folderId=${folderId}` : ""
  }`;
  const response = await fetch(url);
  return await response.json();
}
