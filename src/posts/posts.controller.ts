import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
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
}
