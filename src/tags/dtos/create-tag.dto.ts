import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Tag 1',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: 'The slug of the tag',
    example: 'tag-1',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'slug must be a string that can only contain lowercase letters, numbers, and hyphens. For example my-url',
  })
  @MaxLength(256)
  slug: string;

  @ApiPropertyOptional({
    description: 'The description of the tag',
    example: 'This is a description of the tag',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The schema of the tag',
    example: 'This is a schema of the tag',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiProperty({
    description: 'The featured image URL of the tag',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @MaxLength(1024)
  @IsUrl()
  featuredImageUrl?: string;
}
