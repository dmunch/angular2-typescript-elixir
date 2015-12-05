import {UserListComponent} from './user-list';
import {UserService, User} from '../../services/UserService';

describe('UserListComponent', () => {
  var userService: any;
        

  beforeEach(() => {
      userService = jasmine.createSpyObj("userService", ["get", "upsert", "delete"]);
  });
        
  it('should call get on service on instanciation', () => {
    userService.get.and.returnValue([]);
    
    var component = new UserListComponent(<UserService> userService);
    
    expect(userService.get).toHaveBeenCalled();
  });

  it('should have loaded the users from the service', () => {
    userService.get.and.returnValue([new User(1, "daniel"), new User(2, "philip")]);
    
    var component = new UserListComponent(<UserService> userService);
    
    expect(component.users.length).toEqual(2);
    expect(component.users[0]).toEqual(new User(1, "daniel"));
    expect(component.users[1]).toEqual(new User(2, "philip"));
  });

  
  it('should call upsert on repository when adding a new users', () => {
    var component = new UserListComponent(<UserService> userService);
    component.createUser(new User(10, "new user"));
    
    expect(userService.upsert).toHaveBeenCalled();
  });
  
  it('should call upsert on repository when updating a user', () => {
    var component = new UserListComponent(<UserService> userService);
    component.updateUser(new User(10, "new user"));
    
    expect(userService.upsert).toHaveBeenCalled();
  });
  
  it('should call delete on repository when deleting a user', () => {
    userService.get.and.returnValue([new User(1, "deleted user")]);

    var component = new UserListComponent(<UserService> userService);
    component.deleteUser(new User(1, "deleted user"));
    
    expect(userService.delete).toHaveBeenCalled();
  });
  
  it('should have removed the user when deleting a user', () => {
    userService.get.and.returnValue([new User(1, "deleted user")]);

    var component = new UserListComponent(<UserService> userService);
    
    expect(component.users.length).toEqual(1);
    component.deleteUser(new User(1, "deleted user"));
    
    expect(component.users.length).toEqual(0);
  });
})