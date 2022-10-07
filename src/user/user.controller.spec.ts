import {
  BadRequestException
} from '@nestjs/common';
import {
  Test
} from '@nestjs/testing';
import {
  PrismaService
} from '../prisma/prisma.service';
import {
  UserController
} from './user.controller';
import {
  UserService
} from './user.service';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userService = moduleRef.get < UserService > (UserService);
    userController = moduleRef.get < UserController > (UserController);
  });

  describe('Users', () => {
    it('should return a User', async () => {
      const result = {
        "id": 6,
        "user_name": "aobidov5",
        "password": "1111",
        "registered_at": new Date("2022-10-06T07:09:39.117Z"),
        "role": 0
      };
      expect(await userController.getUsers(6)).toEqual(result);
    });
    it("should return Object", async () => {
      expect(await userController.loginUser("aobidov7", "1111"))
        .toEqual({
          "id": 7,
          "password": "1111",
          "registered_at": new Date("2022-10-06T07:09:45.559Z"),
          "role": 0,
          "user_name": "aobidov7"
        })
    })

    it("Should return Exception", async () => {
      try {
        await userController.loginUser("aobidov4", "111331")
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    // it("Should return array on success else return exception", async () => {
    //   await userController.deleteUser("6", "11")
    //   .then((data) => {
    //     expect(data).toBeInstanceOf(typeof {})
    //   }).catch((err) => {
    //     console.log(err);
        
    //     expect(err).toBeInstanceOf(BadRequestException)
    //   })
    // })
  });
});