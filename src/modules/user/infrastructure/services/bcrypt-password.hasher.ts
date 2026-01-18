import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from '../../domains/services/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    // Implement bcrypt hashing logic here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
