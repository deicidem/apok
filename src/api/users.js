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

export async function all() {
  return await server.get('user');
}

export async function allFiltered(search) {
  let params = search == null ? {search} : null;
  return await server.get('user', {params});
}