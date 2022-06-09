import server from "@/api/http";

export async function login({email, password}) {
  return server.post('api/login', {
    email,
    password,
    remember: true
  }).then(() => {
    return server.get('api/user/auth');
  });
}

export async function register({firstName, lastName, email, password, password_confirmation}) {
  return server.post('api/register', {
    firstName,
    lastName,
    email,
    password,
    password_confirmation
  }).then(() => {
    return server.get('api/user/auth');
  });
}