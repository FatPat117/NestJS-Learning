import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionDto } from '../dtos/create-post-meta-option.dto';
import { MetaOption } from '../meta-option.entity';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostMetaOptionDto: CreatePostMetaOptionDto) {
    const metaOption = this.metaOptionRepository.create(
      createPostMetaOptionDto,
    );
    return await this.metaOptionRepository.save(metaOption);
  }
}
