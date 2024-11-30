import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = { access_token: 'test_token' };
      const user = { username: 'testuser', password: 'password123' };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(user)).toEqual(result);
      expect(authService.validateUser).toHaveBeenCalledWith(
        user.username,
        user.password,
      );
      expect(authService.login).toHaveBeenCalledWith(user);
    });
  });
});
