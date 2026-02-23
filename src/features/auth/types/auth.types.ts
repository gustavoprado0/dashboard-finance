export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  user: User;
  token: string;
}