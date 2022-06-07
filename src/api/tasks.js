import server from "@/api/http";

export async function all() {
  let res = await server.get('sanctum/csrf-cookie');
  console.log(res);
  let {data} = await server.get('api/tasks');
  data.tasks.forEach(el => {
    if (el.result != null) {
      el.result.views.forEach(v => {
        v.previewPath = server.defaults.baseURL + "api/images?path=" + v.previewPath
      })
    }
      el.result.files.forEach(f => {
        f.path = server.defaults.baseURL + "api/files/download?fileId=" + f.id
      })
  });
  console.log(data);
  return data.tasks;
}

export async function add({planId, files, dzzs, vectors, params, links}) {

  let formData = new FormData();
  formData.append('planId', planId);

  for (let i = 0; i < dzzs.length; i++) {
    formData.append(`dzzs[${i}]`, dzzs[i]);
  }
  for (let i = 0; i < files.length; i++) {
    formData.append(`files[${i}]`, files[i]);
  }
  for (let i = 0; i < vectors.length; i++) {
    formData.append(`vectors[${i}]`, vectors[i]);
  }
  console.log(vectors);
  for (let i = 0; i < params.length; i++) {
    formData.append(`params[${i}]`, params[i]);
  }
  for (var pair of formData.entries())
  {
    console.log(pair[0]+ ', '+ pair[1]); 
  }

  formData.append('links', JSON.stringify(links));

  let data = await server.post('api/tasks', formData);

  console.log(data);
  return data.tasks;
}