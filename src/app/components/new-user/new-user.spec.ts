import {NewUserComponent} from './new-user';
import {UserService, User} from '../../services/UserService';
import {ErrorHandler} from '../../services/ErrorHandler';
import {Router} from 'angular2/router';

describe('NewUserComponent', () => {
  var userService: any;
  var errorHandler: any;        
  var router: any;
  beforeEach(() => {
      userService = jasmine.createSpyObj("userService", ["upsert"]);
      errorHandler = jasmine.createSpyObj("errorHandler", ["handleError"]);
  });
  
  it('should call upsert on repository when adding a new users', () => {
    userService.upsert.and.returnValue(new Promise(r => r()));
    
    var component = new NewUserComponent(<UserService> userService, <Router> router, <ErrorHandler> errorHandler);
    component.addUser(new User("10", "new user", "", ""));
    
    expect(userService.upsert).toHaveBeenCalled();
  });
})