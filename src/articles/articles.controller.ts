  import { Controller, Get, Post, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
  import { ArticlesService } from './articles.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Article } from './articles.service';
  import { GptService } from '../gpt/gpt.service';
  
  
  @Controller('articles')
  export class ArticlesController {
    constructor(
      private readonly articlesService: ArticlesService,
      private readonly gptService: GptService,
    ) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(
      @Body() articleDto,
      @Request() req,
    ): Article {
      return this.articlesService.create(
        articleDto,
        req.user.userId,
      );
    }
      
    @Get()
    findAll() {
      return this.articlesService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Post(':id/ask')
    async askQuestion(
      @Param('id') id: number,
      @Body('question') question: string,
    ): Promise<{ answer: string }> {
      const article = await this.articlesService.findOne(+id);
      if (!article) {
        throw new NotFoundException('Article not found');
      }
  
      const answer = await this.gptService.askQuestion(article.content, question);
      return { answer };
    }
  

  }
  