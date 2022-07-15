import server from "@/api/http";

export async function all() {
  let res = await server.get('groups');
  return res;
}
export async function allByUser(userId) {
  let res = await server.get('groups', {params: {userId}});
  return res;
}
export async function allByOwner(ownerId) {
  let res = await server.get('groups', {params: {ownerId}});
  return res;
}
export async function allFiltered() {
  let res = await server.get('groups');
  return res;
}
export async function one(id) {
  let res = await server.get('groups/' + id);
  return res;
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
  return data.types;
}