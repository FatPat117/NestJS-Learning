import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // public getUser() {
  //   return 'You sent a get request to users endpoint';
  // }

  @Get('/:id')
  public getUserById(
    @Param() params: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number | undefined,
  ) {
    return this.usersService.findAll(params, limit ?? 10, page ?? 1);
  }

  // @Get('/:id{/:optional}')
  // public getUserById(@Param() params: any, @Query() query: any) {
  //   return { params, query };
  // }

  // @Post()
  // public postUserWithBody(@Body(new ValidationPipe()) body: CreateUserDto) {
  //   return body;
  // }

  @Post()
  public postUserWithBody(@Body() body: CreateUserDto) {
    return body;
  }

  @Patch()
  public patchUserWithBody(@Body() body: PatchUserDto) {
    return body;
  }
}
