import {Component} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {User, UserService} from '../../services/UserService';
import {ErrorHandler} from '../../services/ErrorHandler';

@Component({
  selector:    'delete-user',
  templateUrl: 'app/components/delete-user/delete-user.html'
})

export class DeleteUserComponent {
  user: User = new User(null, null, null, null);
  
  constructor(private service: UserService, private router: Router, params: RouteParams, private errorHandler: ErrorHandler) {
    var id = params.get('id');
    
    service.getById(id)
      .then(user => this.user = user);
  }
  
  deleteUser() { 
    this.service.delete(this.user)
      .then(() => this.router.navigate(["/Home"]))
      .catch(error => this.errorHandler.handleError("Error deleting user: " + this.user.name));
  }
  
  cancel() {
    this.router.navigate(["/Home"]);
  }
}