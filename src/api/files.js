import server from "@/api/http";

export async function getPolygon(formData) {
  let data = await server.post('api/files/polygon', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
}

export async function loadDzzArchive(formData) {
  formData.append('fileTypeId', 3);
  let data = await server.post('api/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  console.log(data);
  return data;
}
export async function download(path) {
  let data = await server.get('api/files/download', {params: {path}});
  console.log(data);
  return data;
}