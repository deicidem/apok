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

export async function logout() {
  return server.post('logout');
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
export async function update({firstName, lastName, email}) {
  return server.put('user/profile-information', {
    firstName,
    lastName,
    email,
  });
}
export async function updatePassword({email, currentPassword, password, passwordConfirmation}) {
  return server.put('user/password', {
    email,
    current_password: currentPassword,
    password,
    password_confirmation: passwordConfirmation
  });
}
export async function verifyEmail(url) {
  return server.get(url);
}