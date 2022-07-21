import server from "@/api/http";
export async function setCookie() {
  return await server.get('csrf-cookie');
}

export async function auth() {
  return await server.get('user/auth');
}

export async function isAuth() {
  return await server.get('user/check-auth');
}

export async function login({email, password, remember}) {
  return await server.post('login', {
    email,
    password,
    remember
  });
}

export async function logout() {
  return await server.post('logout');
}

export async function register({firstName, lastName, email, password, password_confirmation}) {
  return await server.post('register', {
    firstName,
    lastName,
    email,
    password,
    password_confirmation
  });
}

export async function update({firstName, lastName, email}) {
  return await server.put('user/profile-information', {
    firstName,
    lastName,
    email,
  });
}

export async function updatePassword({email, currentPassword, password, passwordConfirmation}) {
  return await server.put('user/password', {
    email,
    current_password: currentPassword,
    password,
    password_confirmation: passwordConfirmation
  });
}

export async function getTasks(params) {
  return await server.get('user/tasks', {params});
}
export async function getTask(id) {
  return await server.get('user/tasks/'+id);
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

  let data = await server.post('user/tasks', formData);
  console.log(data);
  return data.data;
}
export async function deleteTasks(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];    
  }
  return await server.delete('user/tasks', {params})
}

export async function deleteTask(id) {
  return await server.delete('user/tasks/'+id);
}

export async function getFiles(params) {
  return await server.get('user/files', {params});
  
}

export async function deleteFiles(filesIds) {
  let params = {};
  for (let i = 0; i < filesIds.length; i++) {
    params[`ids[${i}]`] = filesIds[i];    
  }
  return await server.delete('user/files', {params});
}

export async function deleteFile(id) {
  return await server.delete('user/files/'+id);
}

export async function getGroups(params) {
  return await server.get('user/groups', {params});
}

export async function deleteGroups(groupsIds) {
  let params = {};
  for (let i = 0; i < groupsIds.length; i++) {
    params[`ids[${i}]`] = groupsIds[i];    
  }
  return await server.delete('user/groups', {params});
}

export async function deleteGroup(id) {
  return await server.delete('user/groups/' + id);
}