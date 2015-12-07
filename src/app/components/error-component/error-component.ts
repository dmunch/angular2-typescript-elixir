import {Component} from 'angular2/angular2';

@Component({
  selector:    'error',
  templateUrl: 'app/components/error-user/delete-user.html'
})

export class DeleteUserComponent {
  user: User;
  
  constructor(private service: UserService, private router: Router, params: RouteParams) {
    var id = +params.get('id');
    
    service.getById(id)
      .then(user => this.user = user);
  }
  
  deleteUser() { 
    this.service.delete(this.user)
      .then(() => this.router.navigate(["/Home"]))
      .catch(error => {});
  }
  
  cancel() {
    this.router.navigate(["/Home"]);
  }
}