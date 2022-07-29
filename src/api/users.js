import server from "@/api/http";

export async function all(params) {
  return await server.get('users', {
    params,
    
  }, {errorTitle: "Ошибка при получении списка пользователей"});
}

export async function one(id) {
  return await server.get('users/' + id, {
    errorTitle: "Ошибка при получении пользователя"
  });
}

export async function getLogs(id) {
  return await server.get('users/' + id + '/logs', {
    errorTitle: "Ошибка при получении логов пользователя"
  });
}

export async function update(params) {
  return await server.put('user/profile-information', params, {errorTitle: "Ошибка при обновлении данных пользователя"});
}

export async function create(params) {
  return await server.post('users', params, {errorTitle: "Ошибка при создании пользователя"});
}


export async function remove(id) {
  return await server.delete('users/' + id, {
    errorTitle: "Ошибка при удалении пользователя"
  });
}
export async function block(id) {
  return await server.post(`users/${id}/block`, {
    errorTitle: "Ошибка при блокировке пользователя"
  });
}
export async function unblock(id) {
  return await server.post(`users/${id}/unblock`, {
    errorTitle: "Ошибка при разблокировке пользователя"
  });
}