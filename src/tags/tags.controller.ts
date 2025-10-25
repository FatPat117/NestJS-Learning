import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post()
  public createTags(@Body() createTagsDto: CreateTagDto) {
    return this.tagsService.create(createTagsDto);
  }

  @Delete(':id')
  public deleteTags(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
}
