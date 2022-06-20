import server from "@/api/http";

function fixTask(task) {
  task.date = new Date(task.date);
  if (task.result != null) {
    task.result.views.forEach(v => {
      v.previewPath = server.defaults.baseURL + "images?path=" + v.previewPath
    })
    task.result.files.forEach(f => {
      f.path = server.defaults.baseURL + "files/download?fileId=" + f.id
    })
  }
}

export async function all() {
    let { data } = await server.get('tasks');
    data.tasks.forEach(el => {
      fixTask(el);
    });
    return data.tasks;
}
export async function one(id) {
  let {data} = await server.get('tasks/'+id);
  fixTask(data.task);
  return data.task;
}

export async function deleteTasks(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];    
  }
  return await server.delete('tasks', {params})
}

export async function deleteUserTask(id) {
  return await server.delete('tasks/'+id);
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

  let data = await server.post('tasks', formData);
  console.log(data);
  return data.tasks;
}