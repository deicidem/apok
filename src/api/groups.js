import server from "@/api/http";

export async function all(params) {
  return await server.get('groups', {params});
}
export async function one(id) {
  return await server.get('groups/' + id);
}

export async function deleteGroups(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete('groups', {
    params
  })
}

export async function deleteGroup(id) {
  return await server.delete('groups/' + id);
}

export async function create(params) {
  return await server.post('groups', params);
}
export async function addUsers({groupId, users}) {
  let formData = new FormData();
  for (let i = 0; i < users.length; i++) {
    formData.append(`users[${i}]`, users[i]);
  }
  return await server.post(`groups/${groupId}/users`, formData);
}
export async function getTypes() {
  let {data} = await server.get('group-types');
  return data.data;
}