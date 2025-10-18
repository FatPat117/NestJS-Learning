import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-posts.dto';
import { PostsService } from './providers/posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  public getAllPosts() {
    return 'Get ALL Posts';
  }

  // Get localhost:3000/posts:userId
  @Get('/:userId')
  public getPosts(@Param('userId') userId: string) {
    return this.postService.findAll(userId);
  }

  @Post()
  public createPost(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }
}
