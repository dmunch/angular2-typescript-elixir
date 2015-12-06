import {User, UserService} from '../services/UserService';

export class MockUserService implements UserService{
    private _users : User[] = [ 
            { "id": 1, "name": "Elviro" },
            { "id": 2, "name": "Daniel" },
            { "id": 3, "name": "Philipp" },
        ];
    
    get() : User[] {
        //copy array 
        return this._users.slice(); 
    }
    
    getById(id: number) : User {
        return this._users.find(user => user.id == id);
    }
    
    upsert(user: User) {
        if(user.id != null){
            //update case
            let repoUser = this.getById(user.id);
            repoUser.name = user.name;
        } 
        else {
            //insert case
            this._users.push(user);    
        } 
    }
    
    delete(user: User) {
      var index = this._users.indexOf(user, 0);
      if (index != undefined) {
        this._users.splice(index, 1);
      }
    }
}