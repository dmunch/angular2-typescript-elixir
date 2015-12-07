import {UserListComponent} from './user-list';
import {UserService, User} from '../../services/UserService';
import {ErrorHandler} from '../../services/ErrorHandler';

describe('UserListComponent', () => {
  var userService: any;
  var errorHandler: any;        

  beforeEach(() => {
      userService = jasmine.createSpyObj("userService", ["get", "upsert", "delete"]);
      errorHandler = jasmine.createSpyObj("errorHandler", ["handleError"]);
  });
        
  it('should call get on service on instanciation', () => {
    userService.get.and.returnValue(new Promise(r => r([])));
    
    var component = new UserListComponent(<UserService> userService, <ErrorHandler> errorHandler);

    expect(userService.get).toHaveBeenCalled();
  });

  it('should have loaded the users from the service', done => {
    userService.get.and.returnValue(new Promise(r => r([
      new User(1, "daniel"), 
      new User(2, "philip")
    ])));
    
    var component = new UserListComponent(<UserService> userService, <ErrorHandler> errorHandler);
    
    //need to use setTimeout in order to resolve promise
    //could use https://www.npmjs.com/package/prophecy as an alternative
    setTimeout(() => {
      expect(component.users.length).toEqual(2);
      expect(component.users[0]).toEqual(new User(1, "daniel"));
      expect(component.users[1]).toEqual(new User(2, "philip"));
      done();
    }, 0);
  });
})