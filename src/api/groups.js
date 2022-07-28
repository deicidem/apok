import server from "@/api/http";
export async function all(params) {
  return await server.get('groups', {
    params,

  }, {
    errorTitle: "Ошибка при получении списка  групп"
  });
}
export async function one(id) {
  return await server.get('groups/' + id, {
    errorTitle: "Ошибка при получениb группы"
  });
}

export async function deleteGroups(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete('groups',
    params, {
      errorTitle: "Ошибка при удалении групп"
    })
}

export async function deleteGroup(id) {
  return await server.delete('groups/' + id, {
    errorTitle: "Ошибка при удалении группы"
  });
}

export async function create(params) {
  return await server.post('groups',
    params,

    {
      errorTitle: "Ошибка при создании группы"
    });
}
export async function addUsers({
  groupId,
  users
}) {
  let formData = new FormData();
  for (let i = 0; i < users.length; i++) {
    formData.append(`users[${i}]`, users[i]);
  }
  return await server.post(`groups/${groupId}/users`, formData, {
    errorTitle: "Ошибка при добавлении пользователей в группу"
  });
}