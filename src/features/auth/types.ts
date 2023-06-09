export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface LoginForm {
  username: string;
  password: string;
  authOrigin: string;
}

export interface SignupForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
