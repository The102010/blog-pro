import { Injectable } from '@nestjs/common';

interface Like {
  id: number;
  userId: number;
  articleId: number;
}

@Injectable()
export class LikesService {
  private likes: Like[] = [];

  addLike(userId: number, articleId: number) {
    const likeExists = this.likes.find(
      (like) =>
        like.userId === userId &&
        like.articleId === articleId,
    );
    if (!likeExists) {
      const like = {
        id: Date.now(),
        userId,
        articleId,
      };
      this.likes.push(like);
      return like;
    }
    return { message: 'Already liked' };
  }

  removeLike(userId: number, articleId: number) {
    const index = this.likes.findIndex(
      (like) =>
        like.userId === userId &&
        like.articleId === articleId,
    );
    if (index > -1) {
      this.likes.splice(index, 1);
      return { message: 'Like removed' };
    }
    return { message: 'Like not found' };
  }

  // يمكنك إضافة وظائف أخرى مثل جلب عدد الإعجابات
}
