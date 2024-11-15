import { Injectable } from '@nestjs/common';

export interface Article {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];

  create(articleDto, authorId: number) {
    const article = {
      id: Date.now(),
      ...articleDto,
      authorId,
    };
    this.articles.push(article);
    return article;
  }

  findAll() {
    return this.articles;
  }

  findOne(id: number) {
    return this.articles.find((art) => art.id === id);
  }

  // تحديث وحذف المقالات يمكنك إضافتها هنا
}
