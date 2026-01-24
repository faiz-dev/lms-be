export interface ITokenPayload {
  sub: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  iat?: number;
  exp?: number;
}
