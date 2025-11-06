import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
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

    /**
     * Inject jwtService
     */
    @Inject(JwtService)
    private readonly jwtService: JwtService,

    /**
     * Inject JWT config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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
    // Send confirmation

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTTL,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      },
    );
    return { accessToken };
  }
}
