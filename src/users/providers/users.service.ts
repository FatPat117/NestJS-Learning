import {
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
import { DataSource, Repository } from 'typeorm';
import profileConfig from '../config/profile.config';
import { CreateManyUserDto } from '../dtos/create-many-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUsersParamDto } from '../dtos/get-user-params.dto';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';

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

    // Inject Data source
    private readonly dataSource: DataSource,

    // Inject Users create many provider
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    // Inject Create User Provider

    private readonly createUserProvider: CreateUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
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

  public async createMany(createUsersDto: CreateManyUserDto) {
    return this.usersCreateManyProvider.createMany(createUsersDto.users);
  }
}
