import {Injectable} from 'angular2/angular2';

export class User {
    constructor(public id: string,
     public name: string, 
     public email: string, 
     public description: string) {
    }
}

@Injectable()
export abstract class UserService{    
    abstract get() : Promise<User[]>;
    abstract getById(id: string) : Promise<User>;
    abstract upsert(user: User) : Promise<void>;
    abstract delete(user: User) : Promise<void>;
}
