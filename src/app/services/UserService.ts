import {Injectable} from 'angular2/angular2';

export class User {
    constructor(public id: number, public name: string) {
    }
}

@Injectable()
export abstract class UserService{    
    abstract get() : Promise<User[]>;
    abstract getById(id: number) : Promise<User>;
    abstract upsert(user: User) : Promise<void>;
    abstract delete(user: User) : Promise<void>;
}
