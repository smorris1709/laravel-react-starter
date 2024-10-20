import client from "./axios";
import { route } from "ziggy-js";

export async function login(data: {
  email: string;
  password: string;
  remember?: boolean;
}) {
  return client.get(route("sanctum.csrf-cookie")).then(async () => {
    let res = await client.post(route("login"), data);
    return res.data.data;
  });
}

export async function logout() {
  return client.post(route("logout"));
}

export async function getUser() {
  let { data } = await client.get(route("me"));
  return data.data;
}
