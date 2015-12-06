import {Component} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {User, UserService} from '../../services/UserService';

@Component({
  selector:    'user-list',
  templateUrl: 'app/components/user-list/user-list.html',
  directives: [ROUTER_DIRECTIVES] 
})

export class UserListComponent {
  constructor(private service: UserService) { 
    this.users = service.get();
  }
  
  public users: User[];
  
  editUser(user: User) {  
    this.service.upsert(user);
  }
  
  createUser(user: User) {
    this.service.upsert(user);
  }
  
  updateUser(user: User) {
    this.service.upsert(user);
  }
  
  deleteUser(user: User) { 
    this.service.delete(user);
    
    var index = this.users.indexOf(user, 0);
      if (index != undefined) {
        this.users.splice(index, 1);
      }
  }
}