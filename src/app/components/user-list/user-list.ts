import {Component} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {User, UserService} from '../../services/UserService';
import {ErrorHandler} from '../../services/ErrorHandler';

@Component({
  selector:    'user-list',
  templateUrl: 'app/components/user-list/user-list.html',
  directives: [ROUTER_DIRECTIVES] 
})

export class UserListComponent {
  constructor(private service: UserService, errorHandler: ErrorHandler) { 
    service.get()
      .then(users => this.users = users)
      .catch(error => errorHandler.handleError("Error loading users"));
  }
  
  public users: User[];
}