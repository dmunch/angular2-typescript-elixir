import {Injectable} from 'angular2/angular2';

export class User {
    constructor(public id: number, public name: string) {
        
    }
}

@Injectable()
export abstract class UserService{    
    abstract get() : User[];
    abstract upsert(user: User);
    abstract delete(user: User);
}
