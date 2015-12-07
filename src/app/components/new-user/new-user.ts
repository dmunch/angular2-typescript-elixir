import {Component} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {User, UserService} from '../../services/UserService';
import {UserFormComponent} from '../user-form/user-form';
import {ErrorHandler} from '../../services/ErrorHandler';

@Component({
  selector:    'new-user',
  templateUrl: 'app/components/new-user/new-user.html',
  directives: [UserFormComponent]
})

export class NewUserComponent {
  user: User;
  
  constructor(private service: UserService, private router: Router, private errorHandler: ErrorHandler) { 
    this.user = new User(null, "");
  }
  
  addUser(user: User) {    
    this.service.upsert(user)
      .then(() => this.router.navigate(["/Home"]))
      .catch(error => this.errorHandler.handleError("Error creating user " + user.name));
  }
}