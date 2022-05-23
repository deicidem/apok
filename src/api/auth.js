import server from "@/api/http";

export async function login(email, password) {
  let {data} = await server.post('api/token', {
    email,
    password
  });
  localStorage.setItem('access_token', data.token);
  return data.tasks;
}