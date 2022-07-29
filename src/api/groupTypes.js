import server from "@/api/http";

export async function all() {
  return await server.get('group-types', {
    errorTitle: "Ошибка при получении списка типов групп"
  });
}