import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';
@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(password: string | Buffer): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async comparePassword(
    password: string | Buffer,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
