import {
    BadRequestException,
    HttpCode,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import {
    PrismaService
} from 'src/prisma/prisma.service';

import {
    UserModel
} from "./user.model"

@Injectable()
export class UserService {
    private users = []
    constructor(private prismaService: PrismaService) {}
    async getUsers(id: number) {
        const user = await this.checkUser(Number(id));
        if (!user) {
            throw new BadRequestException("user not found with id " + id)
        }
        if (user.role == 0)
            return user;
        else
            return await this.prismaService.user.findMany(); //this.users;
    }
    async createUser(body: UserModel) {
        // body.id = Date.now().toString();
        body.registered_at = new Date();
        const user = await this.prismaService.user.findUnique({
            where: {
                user_name: body.user_name
            }
        })
        if (user) {
            throw new BadRequestException("This user name exists. Please choose another")
        }

        return await this.prismaService.user.create({
            data: body
        })
    }
    // async getUserById(id: number) {
    //     const user = await this.checkUser(Number(id));
    //     if (!user) {
    //         throw new BadRequestException("user not found with id " + id)
    //     }
    //     return user;
    // }
    async loginUser(user_name: string, password: string) {
        let user = await this.prismaService.user.findFirst({
            where: {
                AND: [{
                        user_name: user_name
                    },
                    {
                        password: password
                    }
                ]
            }
        })
        if (!user) {
            throw new BadRequestException("login or password is incorrect")
        }
        return user
    }
    async deleteUserById(id: string, requesterId: string) {
        const user1 = await this.checkUser(Number(id))
        const user2 = await this.checkUser(Number(requesterId))
        if (!user1 || !user2) {
            throw new BadRequestException("User not found with this id")
        } else if (user2.role != 1)
            throw new BadRequestException("You do not have permission to delete")
        // this.users.splice(userIndex1, 1)
        await this.prismaService.user.delete({
            where: {
                id: Number(id)
            }
        })
        return {
            "statusCode": 201,
            "message": "User successfully deleted",
            "error": "Success",
            "data": await this.prismaService.user.findMany()
        }
    }

    async updateUserInfo(userId: number, adminId:number,body: UserModel){
        let user = await this.checkUser(Number(userId))
        let admin = await this.checkUser(Number(adminId))
        if(!user || admin){
            throw new BadRequestException("You are trying to update on not existing account/or you are not registered")
        }
        if(admin.role == 0){
            throw new BadRequestException("You are not allowed to update the document")
        }
        return await this.prismaService.user.update({
            where: {id: Number(userId)},
            data: body
        })
        
    }
    private async checkUser(id: number): Promise < UserModel > {

        // let userIndex = this.users.findIndex(elem => elem.id == id);
        let user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })
        return user;
    }
}