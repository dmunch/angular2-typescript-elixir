import {bootstrap, Component, Provider} from 'angular2/angular2';

import {UserListComponent} from './components/user-list/user-list';
import {User, UserService} from './services/UserService';
import {MockUserService} from './mocks/MockUserService';

@Component({
    selector: 'my-app',
    template: '<user-list></user-list>',
    directives: [UserListComponent]
})

class AppComponent {}

bootstrap(AppComponent, [UserService, new Provider(UserService, {useClass: MockUserService})]);
