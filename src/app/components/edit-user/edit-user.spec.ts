import {EditUserComponent} from './edit-user';
import {UserService, User} from '../../services/UserService';
import {ErrorHandler} from '../../services/ErrorHandler';
import {Router, RouteParams} from 'angular2/router';

describe('EditUserComponent', () => {
  var userService: any;
  var errorHandler: any;        
  var router: any;
  var routeParams: any;
  
  beforeEach(() => {
      userService = jasmine.createSpyObj("userService", ["getById", "upsert"]);
      errorHandler = jasmine.createSpyObj("errorHandler", ["handleError"]);
      routeParams = jasmine.createSpyObj("routeParams", ["get"]);
  });
  
  it('should call upsert on repository when updating a user', done => {
    routeParams.get.and.returnValue("1");
    userService.getById.and.returnValue(new Promise(r => r(new User("1", "test", "", ""))));
    userService.upsert.and.returnValue(new Promise(r => r()));
    
    var component = new EditUserComponent(<UserService> userService, <Router> router, <RouteParams> routeParams, <ErrorHandler> errorHandler);
    
    //need to use setTimeout in order to resolve promise
    //could use https://www.npmjs.com/package/prophecy as an alternative
    setTimeout(() => {
      component.editUser(new User("10", "new user", "", ""));
      expect(userService.upsert).toHaveBeenCalled();
      done();
    }, 0);    
  });
})