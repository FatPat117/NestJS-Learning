import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { Tags } from './providers/tags';

@Module({
  controllers: [TagsController],
  providers: [Tags]
})
export class TagsModule {}
