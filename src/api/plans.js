import server from "@/api/http";

export async function all() {
  let {data} = await server.get('plans');
  return data;
}