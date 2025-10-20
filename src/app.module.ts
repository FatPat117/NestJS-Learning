import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [],
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Phattanphat1',
      database: 'nestjs-blog',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
