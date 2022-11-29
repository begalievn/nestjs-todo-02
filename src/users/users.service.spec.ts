import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from "@nestjs/mongoose";
import { User } from './entities/user.model';

describe('UsersService', () => {
  let userService: UsersService;

  let mockUserModel = {
    findOne: jest.fn().mockImplementation((searchQuery) => {
      return Promise.resolve({
        name: 'Maria',
        username: 'maria',
      })
    }),

    create: jest.fn().mockImplementation((user) => {
      return Promise.resolve({
        name: 'Maria',
        username: 'maria'
      })
    })
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel
        }
      ],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      name: 'Maria',
      username: 'maria',
      password: 'guess'
    }

    expect(await userService.createUser(user)).toEqual({
      username: 'maria',
      name: 'Maria'
    })
  })
});
