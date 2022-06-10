import server from "@/api/http";

export async function auth() {
  return server.get('csrf-cookie')
    .then(()=>server.get('user/auth'));
}

export async function login({email, password}) {
  return server.post('login', {
    email,
    password,
    remember: true
  });
}

export async function register({firstName, lastName, email, password, password_confirmation}) {
  return server.post('register', {
    firstName,
    lastName,
    email,
    password,
    password_confirmation
  });
}