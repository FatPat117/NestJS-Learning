import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';
import { PatchPostDto } from '../dtos/patch-post-dto';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
  // Injecting Users service
  constructor(
    /**
     * Injecting Users service
     */
    private readonly usersService: UsersService,
    /**
     * Injecting Tags service
     */
    private readonly tagsService: TagsService,
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
        // author: true,
        // tags: true,
      },
    });
    return posts;
  }

  public async createPost(@Body() createPostDto: CreatePostDto) {
    // Find author from database based on authorId
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Find tags
    const tags = await this.tagsService.findAll(createPostDto.tags || []);

    // Create post
    const newPost = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
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

  public async update(patchPostDto: PatchPostDto) {
    // Find the Tags
    const tags = await this.tagsService.findAll(patchPostDto.tags || []);

    // Find the posts
    const post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Update the post
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl = patchPostDto.featuredImageUrl
      ? post.featuredImageUrl
      : undefined;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    // Assign the new tags
    post.tags = tags;

    // Save the post and return
    return await this.postsRepository.save(post);
  }
}
