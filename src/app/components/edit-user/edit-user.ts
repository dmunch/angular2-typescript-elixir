import {Component} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {User, UserService} from '../../services/UserService';
import {UserFormComponent} from '../user-form/user-form';

@Component({
  selector:    'edit-user',
  templateUrl: 'app/components/edit-user/edit-user.html',
  directives: [UserFormComponent]
})

export class EditUserComponent {
  user: User;
  
  constructor(private service: UserService, private router: Router, params: RouteParams) {
    var id = +params.get('id');
    console.log(id);
    this.user = service.getById(id);
    console.log(this.user);
  }
  
  editUser(user: User) { 
    //set the users id to foce insert case
    user.id = this.user.id;   
    this.service.upsert(user);
    this.router.navigate(["/Home"]);
  }
}