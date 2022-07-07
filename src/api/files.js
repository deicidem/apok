import server from "@/api/http";

export async function getPolygon(formData) {
  let data = await server.post('files/polygon', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
}

export async function loadDzzArchive(formData) {
  formData.append('fileTypeId', 3);
  let data = await server.post('files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  console.log(data);
  return data;
}
export async function download(fileId) {
  let data = await server.get('files/download', {params: {fileId}});
  console.log(data);
  return data;
}

export async function all() {
  let res = await server.get('files');
  return res;
}
export async function allFiltered() {
  let res = await server.get('files');
  return res;
}
export async function one(id) {
  let res = await server.get('files/' + id);
  return res;
}

export async function deleteFiles(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete('files', {
    params
  })
}

export async function deleteFile(id) {
  return await server.delete('files/' + id);
}