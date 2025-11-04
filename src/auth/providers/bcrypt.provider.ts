import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string | Buffer): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return (await bcrypt.hash(password, 10)) as string;
  }

  public async comparePassword(
    password: string | Buffer,
    hashPassword: string,
  ): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return (await bcrypt.compare(password, hashPassword)) as boolean;
  }
}
