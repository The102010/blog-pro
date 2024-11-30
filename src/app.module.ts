import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AuthModule } from './auth/auth.module';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    CommentsModule,
    LikesModule,
    AuthModule,
    GptModule,
  ],
})
export class AppModule {}
