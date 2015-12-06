import {Component} from 'angular2/angular2';
import {Router, RouteParams} from 'angular2/router';

import {User, UserService} from '../../services/UserService';

@Component({
  selector:    'delete-user',
  templateUrl: 'app/components/delete-user/delete-user.html'
})

export class DeleteUserComponent {
  user: User;
  
  constructor(private service: UserService, private router: Router, params: RouteParams) {
    var id = +params.get('id');
    
    this.user = service.getById(id);
  }
  
  deleteUser() { 
    this.service.delete(this.user);
    this.router.navigate(["/Home"]);
  }
  
  cancel() {
    this.router.navigate(["/Home"]);
  }
}