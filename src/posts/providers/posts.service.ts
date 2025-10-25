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

  public async findAll(userId: number) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
      },
    });
    return posts;
  }

  public async createPost(@Body() createPostDto: CreatePostDto) {
    // Find author from database based on authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Create post
    const newPost = this.postsRepository.create({
      ...createPostDto,
      author: author,
    });

    // return the post
    return await this.postsRepository.save(newPost);
  }

  public async delete(id: number) {
    // //  Find the post by id
    // const post = await this.postsRepository.findOneBy({ id });
    // if (!post) {
    //   throw new NotFoundException('Post not found');
    // }
    // // Delete the post
    // await this.postsRepository.delete(id);

    // //Delete meta options
    // if (post.metaOptions) {
    //   await this.metaOptionsRepository.delete(post.metaOptions.id);
    // }

    // const inversePost = await this.metaOptionsRepository.find({
    //   where: {
    //     id: post?.metaOptions?.id,
    //   },
    //   relations: {
    //     post: true,
    //   },
    // });

    await this.postsRepository.delete(id);
    // Confirmation
    return { message: 'Post deleted successfully', id };
  }
}
