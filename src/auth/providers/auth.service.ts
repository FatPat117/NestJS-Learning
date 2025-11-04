import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting users service (circular dependency)
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting signin provider
     */
    @Inject(SignInProvider)
    private readonly signInProvider: SignInProvider,
  ) {}
  public async signin(signInDto: SignInDto) {
    return await this.signInProvider.signin(signInDto);
  }

  public isAuth() {
    return true;
  }
}
