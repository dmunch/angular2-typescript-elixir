import {User, UserService} from '../services/UserService';

export class MockUserService implements UserService{
    private _users : User[] = [ 
            { "id": "1", "name": "Elviro", "email": "", "description": "" },
            { "id": "2", "name": "Daniel" , "email": "", "description": ""},
            { "id": "3", "name": "Philipp" , "email": "", "description": ""},
        ];
    
    get() : Promise<User[]> {
        //copy array 
        return new Promise(r => r(this._users.slice()));
    }
    
    getById(id: string) : Promise<User> {
        return new Promise(r => r(this._users.find(user => user.id == id)));
    }
    
    upsert(user: User) : Promise<void> {
        return new Promise<void>(resolve => {
            if(user.id != null){
                //update case
                let repoUser = this._users.find(user => user.id == user.id);
                repoUser.name = user.name;
            } 
            else {
                //insert case
                this._users.push(user);    
            }
            resolve();
        }); 
    }
    
    delete(user: User) : Promise<void> {
        return new Promise<void>((resolve, error) => {
            if(user.id == "2") {
                error("mean user");
            }
            
            var index = this._users.indexOf(user, 0);
            if (index != undefined) {
                this._users.splice(index, 1);
            }
            resolve();
        });
    }
}