export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  jti: string;
  iat: number;
  exp: number;
}
