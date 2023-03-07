export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface UserRegistration extends UserCredentials {
    username: string;
    repeatPassword: string;
  }
  
  export interface IdentityInterface {
    _id: string;
    email: string;
    username: string;
    token: string;
  }