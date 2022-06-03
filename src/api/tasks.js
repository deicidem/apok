import server from "@/api/http";

export async function all() {
  let {data} = await server.get('api/tasks');
  data.tasks.forEach(el => {
    if (el.result != null) {
      el.result.views.forEach(v => {
        v.previewPath = server.defaults.baseURL + "api/images?path=" + v.previewPath
      })
    }
      el.result.files.forEach(f => {
        f.path = server.defaults.baseURL + "api/files/download?path=" + f.path
      })
  });
  console.log(data);
  return data.tasks;
}