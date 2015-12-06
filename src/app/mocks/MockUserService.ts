import {User, UserService} from '../services/UserService';

export class MockUserService implements UserService{
    private _users : User[] = [ 
            { "id": 11, "name": "Elviro" },
            { "id": 12, "name": "Daniel" },
            { "id": 13, "name": "Philipp" },
        ];
    
    get() : User[] {
        //copy array 
        return this._users.slice(); 
    }
    
    upsert(user: User) {
        this._users.push(user);
    }
    
    delete(user: User) {
      var index = this._users.indexOf(user, 0);
      if (index != undefined) {
        this._users.splice(index, 1);
      }
    }
}