import {User, UserService} from './UserService'; 


describe('User', () => {
  it('has name given in the constructor', () => {
    let hero = new User(1, 'Daniel');
    expect(hero.name).toEqual('Daniel');
  });
  
  it('has id given in the constructor', () => {
    let hero = new User(1, 'Daniel');
    expect(hero.id).toEqual(1);
  });
})