import {DeleteUserComponent} from './delete-user';
import {UserService, User} from '../../services/UserService';
import {ErrorHandler} from '../../services/ErrorHandler';
import {Router, RouteParams} from 'angular2/router';

describe('DeleteUserComponent', () => {
  var userService: any;
  var errorHandler: any;        
  var router: any;
  var routeParams: any;
  
  beforeEach(() => {
      userService = jasmine.createSpyObj("userService", ["getById", "delete"]);
      errorHandler = jasmine.createSpyObj("errorHandler", ["handleError"]);
      routeParams = jasmine.createSpyObj("routeParams", ["get"]);
  });
    
  it('should call delete on repository when deleting a user', () => {
    routeParams.get.and.returnValue("1");
    userService.getById.and.returnValue(new Promise(r => r(new User("1", "test", "", ""))));
    userService.delete.and.returnValue(new Promise(r => r()));
    
    var component = new DeleteUserComponent(<UserService> userService, <Router> router, <RouteParams> routeParams, <ErrorHandler> errorHandler);
    component.deleteUser();
    
    expect(userService.delete).toHaveBeenCalled();
  });
})