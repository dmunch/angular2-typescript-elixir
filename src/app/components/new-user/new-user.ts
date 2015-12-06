import {Component} from 'angular2/angular2';
import {Router} from 'angular2/router';

import {User, UserService} from '../../services/UserService';
import {UserFormComponent} from '../user-form/user-form';

@Component({
  selector:    'new-user',
  templateUrl: 'app/components/new-user/new-user.html',
  directives: [UserFormComponent]
})

export class NewUserComponent {
  user: User;
  
  constructor(private service: UserService, private router: Router) { 
    this.user = new User(null, "");
  }
  
  addUser(user: User) {    
    this.service.upsert(user);
    this.router.navigate(["/Home"]);
  }
}