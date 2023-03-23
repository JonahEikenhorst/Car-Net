export interface UserCredentials {
  username: string;
  hash: string;
}

export interface UserRegistration extends UserCredentials {
  email: string
  reapeatPassword: string;
}

export interface Token {
  token: string
}

export interface IdentityInterface {
  _id: string;
  email: string;
  username: string;
  token: string;
}