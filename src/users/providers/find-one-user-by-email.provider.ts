import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /**
     * Inject Repository for User entity
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async findOneUserByEmail(email: string) {
    let user: User | null = null;

    try {
      user = await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
