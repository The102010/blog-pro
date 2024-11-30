import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService, Article } from './articles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('ArticlesController', () => {
  let articlesController: ArticlesController;
  let articlesService: ArticlesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    articlesController = moduleRef.get<ArticlesController>(ArticlesController);
    articlesService = moduleRef.get<ArticlesService>(ArticlesService);
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const articleDto = { title: 'Test Article', content: 'Test Content' };
      const userId = 1;
      const result: Article = {
        id: 1,
        ...articleDto,
        authorId: userId,
      };

      jest.spyOn(articlesService, 'create').mockReturnValue(result);

      expect(
        await articlesController.create(
          articleDto,
          { user: { userId } } as any,
        ),
      ).toEqual(result);
      expect(articlesService.create).toHaveBeenCalledWith(
        articleDto,
        userId,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const result: Article[] = [];
      jest.spyOn(articlesService, 'findAll').mockReturnValue(result);

      expect(await articlesController.findAll()).toBe(result);
    });
  });
});
