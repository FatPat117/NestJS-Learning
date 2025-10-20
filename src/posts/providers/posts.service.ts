import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-posts.dto';

@Injectable()
export class PostsService {
  // Injecting Users service
  constructor(private readonly usersService: UsersService) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    return [
      {
        user: user,
        title: 'title',
        content: 'Testcontent',
        userId: userId,
        id: 1,
      },
      {
        user: user,
        title: 'title2',
        content: 'Testcontent2',
        userId: userId,
        id: 2,
      },
    ];
  }

  public createPost(post: CreatePostDto) {
    return post;
  }
}
