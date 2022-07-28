import server from "@/api/http";

export async function getFiles(params) {
  return await server.get('user/files', {
    params,
  }, {
    errorTitle: "Ошибка при получении списка файлов"
  });
}

export async function deleteFiles(filesIds) {
  let params = {};
  for (let i = 0; i < filesIds.length; i++) {
    params[`ids[${i}]`] = filesIds[i];
  }
  return await server.delete('user/files',
    params, {
      errorTitle: "Ошибка при удалении файлов"
    });
}

export async function deleteFile(id) {
  return await server.delete('user/files/' + id, {
    errorTitle: "Ошибка при удалении файла"
  });
}