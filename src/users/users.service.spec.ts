import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const user = { username: 'testuser', password: 'password123' };
      const createdUser = await usersService.create(user);

      expect(createdUser).toHaveProperty('id');
      expect(createdUser.username).toBe(user.username);
      expect(createdUser.password).not.toBe(user.password);
      expect(
        await bcrypt.compare(user.password, createdUser.password),
      ).toBe(true);
    });
  });

  describe('findByUsername', () => {
    it('should return a user by username', async () => {
      const user = { username: 'testuser', password: 'password123' };
      await usersService.create(user);

      const foundUser = await usersService.findByUsername(user.username);
      expect(foundUser).toHaveProperty('id');
      expect(foundUser.username).toBe(user.username);
    });
  });
});
