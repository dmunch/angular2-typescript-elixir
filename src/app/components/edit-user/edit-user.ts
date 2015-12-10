import {Component} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {User, UserService} from '../../services/UserService';
import {ErrorHandler} from '../../services/ErrorHandler';
import {UserFormComponent} from '../user-form/user-form';

@Component({
  selector:    'edit-user',
  templateUrl: 'app/components/edit-user/edit-user.html',
  directives: [UserFormComponent]
})

export class EditUserComponent {
  user: User;
  
  constructor(private service: UserService, private router: Router, params: RouteParams, private errorHandler: ErrorHandler) {
    var id = params.get('id');
    console.log(id);
    
    service.getById(id)
      .then(user => this.user = user);
  }
  
  editUser(user: User) { 
    //set the users id to foce insert case
    user.id = this.user.id;   
    this.service.upsert(user)
      .then(() => this.router.navigate(["/Home"]))
      .catch(error => this.errorHandler.handleError("Error editing user " + this.user.id));
  }
}