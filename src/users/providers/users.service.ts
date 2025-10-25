import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
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
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if users exists with same email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    // if (existingUser) {
    // }
    // Handle exception

    // Create a new user
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number | undefined,
    page: number | undefined,
  ) {
    const isAuth = this.authService.isAuth();
    console.log('S3_BUCKET:', this.configService.get('S3_BUCKET'));

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
  public async findOneById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: id });
    return user;
  }
}
