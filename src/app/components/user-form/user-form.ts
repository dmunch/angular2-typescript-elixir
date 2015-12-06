import {Component, FormBuilder, Validators, ControlGroup, Control, EventEmitter, Output, Input, OnInit} from 'angular2/angular2'
import {User} from '../../services/UserService';

@Component({
  selector: 'user-form',
  templateUrl: 'app/components/user-form/user-form.html'
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Output() submitted: EventEmitter<User> = new EventEmitter();
  
  userForm : ControlGroup;
  nameControl: Control = new Control("", Validators.required);  
  emailControl: Control = new Control("", Validators.required);
  descriptionControl: Control = new Control("", Validators.minLength(10));
  
  constructor(fb: FormBuilder) {      
    this.userForm = fb.group({
      name: this.nameControl,
      email: this.emailControl,
      description: this.descriptionControl     
    });
  }
  
  ngOnInit() {
    console.log(this.user);
    this.userForm.value = this.user;
    
    this.nameControl.updateValue(this.user.name);
  }
  
  submit(event) {
    console.log(this.userForm.value);    
    event.preventDefault();
    console.log(this.user);
    this.submitted.emit(this.userForm.value);
  }
}