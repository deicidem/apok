import server from "@/api/http";


export async function getTasks(params) {
  return await server.get('user/tasks', {
    params,

  }, {
    errorTitle: "Ошибка при получении списка задач"
  });
}
export async function getTask(id) {
  return await server.get('user/tasks/' + id, {
    errorTitle: "Ошибка при получении задачи"
  });
}
export async function createTask({
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
  formData.append('note', note);

  let data = await server.post('user/tasks', formData, {
    errorTitle: "Ошибка при создании задачи"
  });
  console.log(data);
  return data.data;
}
export async function deleteTasks(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete('user/tasks',
    params,

    {
      errorTitle: "Ошибка при удалении задач"
    })
}

export async function deleteTask(id) {
  return await server.delete('user/tasks/' + id, {
    errorTitle: "Ошибка при удалении задачи"
  });
}
export async function update(id, params) {
  return await server.put('user/tasks/' + id,
    params,

    {
      errorTitle: "Ошибка при редактировании задачи"
    });
}