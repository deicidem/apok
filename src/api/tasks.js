import server from "@/api/http";

export async function all() {
  let {data} = await server.get('tasks');
  console.log(data);
  return data.tasks;
}