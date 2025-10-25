import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreatePostMetaOptionDto } from '../../meta-options/dtos/create-post-meta-option.dto';
import { PostStatus } from '../enums/postStatus.enum';
import { PostType } from '../enums/postType.enum';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'This is a title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(512)
  title: string;

  @ApiProperty({
    description:
      'The type of the post, possible values are post, page, and series',
    example: 'post',
    enum: PostType,
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: 'For Example: my-url',
    example: 'my-url',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'slug must be a string that can only contain lowercase letters, numbers, and hyphens. For example my-url',
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    description:
      'The status of the post, possible values are draft, scheduled, review, and published',
    example: 'draft',
    enum: PostStatus,
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'The content of the post',
    example: 'This is a content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'The schema of the post',
    example: '{"title": "This is a title", "content": "This is a content"}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The featured image url of the post',
    example: 'https://example.com/featured-image.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The publish on date of the post',
    example: '2025-01-01',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'The tags of the post',
    example: ['tag1', 'tag2', 'tag3'],
    type: 'array',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'The meta options of the post',
    example: { metaValue: { sidebarEnable: true } },
    type: 'object',
  })
  @IsOptional()
  @Type(() => CreatePostMetaOptionDto)
  @ValidateNested()
  metaOptions?: CreatePostMetaOptionDto | null;

  @ApiProperty({
    type: 'integer',
    description: 'The author id of the post',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
