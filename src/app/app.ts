import {bootstrap, Component, Provider} from 'angular2/angular2';
import {RouteConfig, ROUTER_BINDINGS, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {UserListComponent} from './components/user-list/user-list';
import {NewUserComponent} from './components/new-user/new-user';
import {EditUserComponent} from './components/edit-user/edit-user';
import {DeleteUserComponent} from './components/delete-user/delete-user';
import {ErrorComponent} from './components/error/error';

import {User, UserService} from './services/UserService';
import {ErrorHandler, LocalStorageErrorHandler} from './services/ErrorHandler';
import {MockUserService} from './mocks/MockUserService';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.html',
    directives: [UserListComponent, ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/', component: UserListComponent, name: 'Home' },
  { path: '/new', component: NewUserComponent, name: 'New' },
  { path: '/edit/:id', component: EditUserComponent, name: 'Edit' },
  { path: '/delete/:id', component: DeleteUserComponent, name: 'Delete' },
  { path: '/error', component: ErrorComponent, name: 'Error' }
])

class AppComponent {}

bootstrap(AppComponent, [UserService,
                        ROUTER_PROVIDERS,
                        new Provider(UserService, {useClass: MockUserService}),
                        new Provider(ErrorHandler, {useClass: LocalStorageErrorHandler}),
                        new Provider(LocationStrategy, {useClass: HashLocationStrategy})]);
