import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Delete,
  } from '@nestjs/common';
  import { LikesService } from './likes.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('likes')
  export class LikesController {
    constructor(
      private readonly likesService: LikesService,
    ) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('add')
    addLike(@Body('articleId') articleId: number, @Request() req) {
      return this.likesService.addLike(
        req.user.userId,
        articleId,
      );
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete('remove')
    removeLike(@Body('articleId') articleId: number, @Request() req) {
      return this.likesService.removeLike(
        req.user.userId,
        articleId,
      );
    }
  }
  