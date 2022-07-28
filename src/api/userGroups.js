import server from "@/api/http";


export async function getGroups(params) {
  return await server.get('user/groups', {
    params,
  }, {
    errorTitle: "Ошибка при получении списка  групп"
  });
}
export async function getUsersByGroup(groupId, params) {
  return await server.get('user/groups/' + groupId + '/users', {params, errorTitle: "Ошибка при получении списка пользователей группы"});
}
export async function createGroup(params) {
  return await server.post('user/groups', params, {
    errorTitle: "Ошибка при создании группы"
  });
}
export async function deleteGroups(groupsIds) {
  let params = {};
  for (let i = 0; i < groupsIds.length; i++) {
    params[`ids[${i}]`] = groupsIds[i];
  }
  return await server.delete('user/groups', params, {
    errorTitle: "Ошибка при удалении групп"
  });
}

export async function deleteGroup(id) {
  return await server.delete('user/groups/' + id, {
    errorTitle: "Ошибка при удалении группы"
  });
}
export async function getInviteLink(id, params) {
  return await server.get('user/groups/' + id + '/invite', {
    params,

  }, {
    errorTitle: "Ошибка при генерации приглашения"
  });
}
export async function exclude(id, userId) {
  return await server.delete('user/groups/' + id + '/users/' + userId, {
    errorTitle: "Ошибка при попытке исключить пользователя"
  });
}
export async function verify(id, userId) {
  return await server.put('user/groups/' + id + '/users/' + userId, {
    errorTitle: "Ошибка при попытке добавить пользователя в группу"
  });
}
export async function quit(id) {
  return await server.delete('user/groups/' + id + '/quit', {
    errorTitle: "Ошибка при попытке выйти из группы"
  });
}
export async function update(id, params) {
  return await server.put('user/groups/' + id, params, {
    errorTitle: "Ошибка обновлении информации о группе"
  });
}