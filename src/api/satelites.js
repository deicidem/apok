import server from "@/api/http";

export async function all() {
  return await server.get('/satelites', {
    errorTitle: "Ошибка при получении списка спутников"
  });
}