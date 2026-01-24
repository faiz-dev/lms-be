export interface IAuthenticatedUser {
  id: number;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}
