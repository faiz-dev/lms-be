import { User } from 'src/modules/user/domains/entities/user.entity';
import { AuthToken } from '../value-objects/auth-token.vo';

export interface IAuthService {
  /**
   * Memvalidasi kredensial user (email & password)
   * Mengembalikan User Entity jika valid, atau null jika gagal
   */
  authenticate(password: string, passwordHash: string): Promise<boolean>;

  /**
   * Membongkar dan memvalidasi token string menjadi payload.
   * Penting agar Domain bisa memverifikasi identitas tanpa tergantung library luar di Use Case.
   */
  verifyToken(token: string): Promise<User | null>;

  /**
   * Membuat token akses (JWT atau lainnya) berdasarkan identitas User
   */
  generateToken(user: User): AuthToken;
}

export const AUTH_SERVICE_TOKEN = Symbol('IAuthService');
