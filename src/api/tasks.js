import server from "@/api/http";

function fixTask(task) {
  task.date = new Date(task.date);
}

export async function all(params) {
  let res = await server.get('tasks', {params});
  res.data.data.forEach(el => {
    fixTask(el);
  });
  return res;
}
export async function one(id) {
  let res = await server.get('tasks/' + id);
  fixTask(res.data.data);
  return res;
}

export async function deleteTasks(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete('tasks', {
    params
  })
}

export async function deleteTask(id) {
  return await server.delete('tasks/' + id);
}

export async function add({
  planId,
  files,
  dzzs,
  vectors,
  params,
  links,
  note
}) {

  let formData = new FormData();
  formData.append('planId', planId);
  console.log(note);
  formData.append('planI', 1);

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
  console.log(formData.getAll());
  let data = await server.post('tasks', formData);
  return data.data;
}