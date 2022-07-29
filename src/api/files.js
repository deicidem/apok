import server from "@/api/http";

export async function getPolygon(formData) {
  let data = await server.post('files/polygon', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    errorTitle: "Ошибка при поиске получении полигона"
  });
  return data;
}

export async function loadDzzArchive(formData) {
  formData.append('fileTypeId', 3);
  let data = await server.post('files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    errorTitle: "Ошибка при загрузке файла"
  });
  console.log(data);
  return data;
}
export async function download(fileId) {
  let data = await server.get('download', {
    params: {
      fileId
    },

  }, {
    errorTitle: "Ошибка при скачивании файла"
  });
  console.log(data);
  return data;
}

export async function all(params) {
  return await server.get('files', {
    params,

  }, {
    errorTitle: "Ошибка при получении списка файлов"
  });
}

export async function one(id) {
  let res = await server.get('files/' + id, {
    errorTitle: "Ошибка при получении файла"
  });
  return res;
}

export async function deleteFiles(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete('files',
    params, {
      errorTitle: "Ошибка при удалении файлов"
    })
}

export async function deleteFile(id) {
  return await server.delete('files/' + id, {
    errorTitle: "Ошибка при удалении файла"
  });
}