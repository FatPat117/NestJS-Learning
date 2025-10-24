import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  // Injecting Users service
  constructor(
    private readonly usersService: UsersService,
    /**
     * Injecting Post repository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Injecting MetaOption repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

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

  public async createPost(@Body() createPostDto: CreatePostDto) {
    // Create post
    const newPost = this.postsRepository.create({
      ...createPostDto,
    });

    // return the post
    return await this.postsRepository.save(newPost);
  }
}
