import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Delete,
    Param,
  } from '@nestjs/common';
  import { CommentsService } from './comments.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  @Controller('comments')
  export class CommentsController {
    constructor(
      private readonly commentsService: CommentsService,
    ) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(
      @Body() commentDto,
      @Request() req,
    ) {
      return this.commentsService.create(
        commentDto,
        req.user.userId,
      );
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(
      @Param('id') id: number,
      @Request() req,
    ) {
      return this.commentsService.delete(
        id,
        req.user.userId,
      );
    }
  }
  