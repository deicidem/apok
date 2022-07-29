import server from "@/api/http";
export async function setCookie() {
  return await server.get('csrf-cookie', {
    errorTitle: "Ошибка при установлении cookie"
  });
}

export async function auth() {
  return await server.get('user/auth', {
    errorTitle: "Ошибка при попытке аутентификации"
  });
}

export async function isAuth() {
  return await server.get('user/check-auth');
}

export async function login({
  email,
  password,
  remember
}) {
  return await server.post('login', {
    email,
    password,
    remember,
  }, {
    errorTitle: "Ошибка при попытке входа в систему"
  });
}

export async function logout() {
  return await server.post('logout', {
    errorTitle: "Ошибка при попытке выхода из системы"
  });
}

export async function register({
  firstName,
  lastName,
  email,
  password,
  password_confirmation,
  organisation,
  phoneNumber
}) {
  return await server.post('register', {
    firstName,
    lastName,
    email,
    password,
    password_confirmation,
    organisation,
    phoneNumber
  }, {
    errorTitle: "Ошибка при попытке регистрации в системе"
  });
}

export async function update({
  firstName,
  lastName,
  email,
  phoneNumber,
  organisation
}) {
  return await server.put('user/profile-information', {
    firstName,
    lastName,
    email,
    phoneNumber,
    organisation
  }, {
    errorTitle: "Ошибка при изменить личные данные"
  });
}

export async function updatePassword({
  email,
  currentPassword,
  password,
  passwordConfirmation
}) {
  return await server.put('user/password', {
    email,
    current_password: currentPassword,
    password,
    password_confirmation: passwordConfirmation
  }, {
    errorTitle: "Ошибка при попытке смены пароля"
  });
}
export async function forgotPassword({
  email
}) {
  return await server.post('forgot-password', {
    email
  }, {
    headers: {
      "Accept": "application/json"
    },
    errorTitle: "Ошибка при попытке восстановить пароль"
  });
}
export async function resetPassword({
  password,
  token,
  email
}) {
  return await server.post('reset-password', {
    password: password.password,
    password_confirmation: password.confirm,
    token,
    email
  }, {
    headers: {
      "Accept": "application/json"
    },
    errorTitle: "Ошибка при попытке восстановить пароль"
  });
}