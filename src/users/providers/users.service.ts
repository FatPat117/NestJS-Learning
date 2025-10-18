import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-user-params.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number | undefined,
    page: number | undefined,
  ) {
    return [
      {
        firstName: 'john',
        email: 'john@example.com',
        age: 20,
      },
      {
        firstName: 'jane',
        email: 'jane@example.com',
        age: 21,
      },
      {
        firstName: 'jim',
        email: 'jim@example.com',
        age: 22,
      },
    ];
  }
}
