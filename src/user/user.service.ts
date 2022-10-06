import {
    BadRequestException,
    HttpCode,
    Injectable,
    NotFoundException
} from '@nestjs/common';

import {
    User
} from "./user.model"

@Injectable()
export class UserService {
    private users = []
    getUsers() {
        return this.users;
    }
    createUser(body: User) {
        // body.id = Date.now().toString();
        body.registered_at = new Date();
        const [user, _] = this.checkUser(body.id)
        if (user) {
            throw new BadRequestException("This user id exists. Please choose another")
        }
        this.users.push(body)
        return this.users
    }
    getUserById(id: string) {
        const [user, _] = this.checkUser(id);
        if (!user) {
            throw new BadRequestException("user not found with this id")
        }
        return user;
    }
    loginUser(user_name: string, password: string) {
        let user = this.users.find(elem => elem.user_name == user_name && elem.password == password)
        if (!user) {
            throw new BadRequestException("user not found")
        }
        return user
    }
    deleteUserById(id: string, requesterId:string) {
        const [user1, userIndex1] = this.checkUser(id)
        const [user2, _] = this.checkUser(requesterId)
        if (!user1 || !user2) {
            throw new BadRequestException("User not found with this id")
        } else if (user2.role != 1)
            throw new BadRequestException("You do not have permission to delete")
        this.users.splice(userIndex1, 1)
        return {
            "statusCode": 201,
            "message": "User successfully deleted",
            "error": "Success",
            "data": this.users
        }
    }
    private checkUser(id: string): [User, number] {
        let userIndex = this.users.findIndex(elem => elem.id == id);
        let user = this.users[userIndex];
        return [user, userIndex];
    }
}