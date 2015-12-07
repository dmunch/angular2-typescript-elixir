import {Component} from 'angular2/angular2';

@Component({
  selector:    'error',
  templateUrl: 'app/components/error/error.html'
})

export class ErrorComponent {
  error: string;
  
  constructor() {
    this.error = localStorage.getItem("lastError");
  }
}