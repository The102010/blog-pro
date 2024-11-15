import { Injectable } from '@nestjs/common';

interface Comment {
  id: number;
  content: string;
  authorId: number;
  articleId: number;
}

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  create(commentDto, authorId: number) {
    const comment = {
      id: Date.now(),
      ...commentDto,
      authorId,
    };
    this.comments.push(comment);
    return comment;
  }

  delete(commentId: number, userId: number) {
    const index = this.comments.findIndex(
      (c) => c.id === commentId && c.authorId === userId,
    );
    if (index > -1) {
      this.comments.splice(index, 1);
      return { message: 'Comment deleted' };
    }
    return { message: 'Comment not found or unauthorized' };
  }

  // يمكنك إضافة وظائف أخرى مثل جلب التعليقات
}
