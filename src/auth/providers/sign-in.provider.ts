import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Injecting userservice
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject hashingProvider
     */
    @Inject(HashingProvider)
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signin(signInDto: SignInDto) {
    // Find the user using email
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // Throw an exception if the user is not found
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Check if the password is correct
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    // Throw an exception if the password is incorrect
    if (!isEqual) {
      throw new UnauthorizedException('Invalid password');
    }
    // Send confirmatio
    return true;
  }
}
