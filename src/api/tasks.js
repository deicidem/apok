import server from "@/api/http";

function fixTask(task) {
  task.date = new Date(task.date);
  if (task.result != null) {
    task.result.views.forEach(v => {
      v.previewPath = server.defaults.baseURL + "api/images?path=" + v.previewPath
    })
    task.result.files.forEach(f => {
      f.path = server.defaults.baseURL + "api/files/download?fileId=" + f.id
    })
  }
}

export async function all() {
  return await server.get('sanctum/csrf-cookie').then(async () => {
    let data = await server.post('api/login', {
          email: "test@example.com",
          password: "password"
        }, {
          headers: {
            'Accept': 'application/json'
          }
        });
        console.log(data);
  }).then(async() => {
    let {
      data
    } = await server.get('api/tasks');
    data.tasks.forEach(el => {
      fixTask(el);
    });
    console.log(data);
    return data.tasks;
  });
}
export async function one(id) {
  let {data} = await server.get('api/tasks/'+id);
  fixTask(data.task);
  return data.task;
}
export async function add({
  planId,
  files,
  dzzs,
  vectors,
  params,
  links
}) {

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
  for (let i = 0; i < params.length; i++) {
    formData.append(`params[${i}]`, params[i]);
  }

  formData.append('links', JSON.stringify(links));

  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  let data = await server.post('api/tasks', formData);

  console.log(data);
  return data.tasks;
}