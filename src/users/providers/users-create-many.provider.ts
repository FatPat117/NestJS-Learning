import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject Data source
     */
    private readonly dataSource: DataSource,
  ) {}
  public async createMany(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    // Create Query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect Query runner to datasource
    await queryRunner.connect();

    // Start Transaction
    await queryRunner.startTransaction();

    try {
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        await queryRunner.manager.save(newUser);
        newUsers.push(newUser);
      }
      // If successfully created, commit transaction
      await queryRunner.commitTransaction();
      return newUsers;
    } catch (error) {
      // If failed, rollback transaction
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release connection
      await queryRunner.release();
    }
    return newUsers;
  }
}
