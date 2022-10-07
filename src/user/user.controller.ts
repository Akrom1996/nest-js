import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Query,
    Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
    UserModel
} from './user.model';

import {
    UserService
} from './user.service';

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    @ApiOperation({ description: 'Register user with body user_name, password, role' })
    registerUser(@Body() body: UserModel) {
        return this.userService.createUser(body);
    }
    @Get('/login')
    @ApiOperation({ description: 'User login ' })
    loginUser(@Query('user_name') user_name: string, @Query('pwd') password: string) {
        return this.userService.loginUser(user_name, password);
    }
    @Get(':id')
    @ApiOperation({ description: 'Pass your userId return list of users or one user' })
    getUsers(@Param('id') id: number) {
        return this.userService.getUsers(id);
    }

    @Delete(':id/:requesterId')
    @ApiOperation({ description: 'Delete user first parameter is id of user being removed, second is admin id' })
    deleteUser(@Param('id') id: string, @Param('requesterId') requesterId:string) {
        return this.userService.deleteUserById(id,requesterId);
    }

    @Put(":userId/:adminId")
    @ApiOperation({ description: 'Update user first parameter is id of user being updated, second is admin id' })
    updateUser(@Param('userId') userId:number,@Param('adminId') adminId:number, @Body() body: UserModel){
        return this.userService.updateUserInfo(userId,adminId,body)
    }
}