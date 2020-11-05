export interface User {
  email: string;
  name: string;
  password: string;
  hashedPassword?: string;
}

export interface ComparePassword {
  hashedPassword: string;
  password: string;
}
