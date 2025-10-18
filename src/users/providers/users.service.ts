import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUsersParamDto } from '../dtos/get-user-params.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number | undefined,
    page: number | undefined,
  ) {
    const isAuth = this.authService.isAuth();
    return [
      {
        isAuth: isAuth,
        firstName: 'john',
        email: 'john@example.com',
        age: 20,
      },
      {
        isAuth: isAuth,
        firstName: 'jane',
        email: 'jane@example.com',
        age: 21,
      },
      {
        isAuth: isAuth,
        firstName: 'jim',
        email: 'jim@example.com',
        age: 22,
      },
    ];
  }

  // Find a user by d
  public findOneById(id: string) {
    const isAuth = this.authService.isAuth();
    return {
      isAuth: isAuth,
      id: id,
      firstName: 'john',
      email: 'john@example.com',
      age: 20,
    };
  }
}
