import server from "@/api/http";

export async function all(params) {
  return await server.get('users', {params}); 
}

export async function one(id) {
  return await server.get('users/'+id);
}

export async function getLogs(id) {
  return await server.get('users/'+id+'/logs');
}

export async function update({id, firstName, lastName, email}) {
  return await server.put('user/profile-information', {
    id,
    firstName,
    lastName,
    email,
  });
}

export async function create({firstName, lastName, email, password, password_confirmation}) {
  return await server.post('users', {
    firstName,
    lastName,
    email,
    password,
    password_confirmation
  });
}


export async function remove(id) {
  return await server.delete('users/'+id);
}
export async function block(id) {
  return await server.post(`users/${id}/block`);
}
export async function unblock(id) {
  return await server.post(`users/${id}/unblock`);
}