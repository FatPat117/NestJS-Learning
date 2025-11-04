import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public signin(signInDto: SignInDto) {
    // Find the user using email
    // Throw an exception if the user is not found
    // Check if the password is correct
    // Throw an exception if the password is incorrect
    // Send confirmatio
  }

  public isAuth() {
    return true;
  }
}
