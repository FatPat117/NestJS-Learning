import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
@Controller('users')
export class UsersController {
  @Get()
  public getUser() {
    return 'You sent a get request to users endpoint';
  }

  @Get('/:id')
  public getUserById(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', ParseIntPipe, new DefaultValuePipe(10))
    limit: number | undefined,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1))
    page: number | undefined,
  ) {
    return {
      id,
      typeofid: typeof id,
      limit,
      typeoflimit: typeof limit,
      page,
      typeofpage: typeof page,
    };
  }

  // @Get('/:id{/:optional}')
  // public getUserById(@Param() params: any, @Query() query: any) {
  //   return { params, query };
  // }

  @Post()
  public postUserWithBody(@Body(new ValidationPipe()) body: CreateUserDto) {
    return body;
  }
}
