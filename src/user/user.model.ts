export class UserModel{
    id:number;
    user_name:string;
    password:string;
    registered_at: Date;
    role: number;
    constructor(id: number, user_name: string, password: string, registered_at: Date, role: number){
        this.id = id;
        this.user_name = user_name;
        this.password = password;
        this.registered_at=registered_at;
        this.role = role;
    }
}