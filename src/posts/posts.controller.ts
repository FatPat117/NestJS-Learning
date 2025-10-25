import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-posts.dto';
import { PatchPostDto } from './dtos/patch-post-dto';
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
  public getPosts(@Param('userId') userId: number) {
    return this.postService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Create a new post',
    description: 'Create a new post',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created',
    type: CreatePostDto,
  })
  @Post()
  public createPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }

  @ApiOperation({
    summary: 'Patch a post',
    description: 'Patch a post',
    tags: ['Posts'],
  })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully patched',
  })
  @Patch()
  public patchPost(@Body() body: PatchPostDto) {
    return this.postService.update(body);
  }

  @ApiOperation({
    summary: 'Delete a post',
    description: 'Delete a post',
    tags: ['Posts'],
  })
  @Delete(':id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
