import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';
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
    registerUser(@Body() body: UserModel) {
        return this.userService.createUser(body);
    }
    @Get('/login')
    loginUser(@Query('user_name') user_name: string, @Query('pwd') password: string) {
        return this.userService.loginUser(user_name, password);
    }
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }
    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @Delete(':id/:requesterId')
    deleteUser(@Param('id') id: string, @Param('requesterId') requesterId:string) {
        return this.userService.deleteUserById(id,requesterId);
    }
}