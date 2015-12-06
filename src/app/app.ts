import {bootstrap, Component, Provider} from 'angular2/angular2';
import {RouteConfig, ROUTER_BINDINGS, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {UserListComponent} from './components/user-list/user-list';
import {NewUserComponent} from './components/new-user/new-user';

import {User, UserService} from './services/UserService';
import {MockUserService} from './mocks/MockUserService';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    directives: [UserListComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/', component: UserListComponent, name: 'Home' },
  { path: '/new', component: NewUserComponent, name: 'New' }
])

class AppComponent {}


bootstrap(AppComponent, [UserService,
                        ROUTER_PROVIDERS,
                        new Provider(UserService, {useClass: MockUserService}),
                        new Provider(LocationStrategy, {useClass: HashLocationStrategy})]);
