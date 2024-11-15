import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { ArticlesService } from './articles.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Article } from './articles.service';

  
  @Controller('articles')
  export class ArticlesController {
    constructor(
      private readonly articlesService: ArticlesService,
    ) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(
      @Body() articleDto,
      @Request() req,
    ) {
      return this.articlesService.create(
        articleDto,
        req.user.userId,
      );
    }
  
    @Get()
    findAll() {
      return this.articlesService.findAll();
    }
  }
  