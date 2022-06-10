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