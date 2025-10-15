import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUser() {
    return 'You sent a get request to users endpoint';
  }

  @Get('/:id{/:optional}')
  public getUserById(@Param() params: any, @Query() query: any) {
    return { params, query };
  }

  @Post()
  public postUserWithBody(@Body() body: any) {
    return body;
  }
}
