import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUsersParamDto } from '../dtos/get-user-params.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  constructor(
    // Circular dependency
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // Repository for User entity
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // Config Service
    private readonly configService: ConfigService,

    // Profile Config
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if users exists with same email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email',
      );
    }

    // Create a new user
    const newUser = this.userRepository.create(createUserDto);

    const savedUser = await this.userRepository.save(newUser);
    if (!savedUser) {
      throw new BadRequestException('Unable to create user');
    }

    return newUser;
  }

  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number | undefined,
    page: number | undefined,
  ) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        message: 'This route is not implemented',
        error: 'This route is not implemented',
        fileName: 'users.service.ts',
        lineNumber: 72,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'This route is not implemented',
      },
    );
  }

  // Find a user by d
  public async findOneById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
