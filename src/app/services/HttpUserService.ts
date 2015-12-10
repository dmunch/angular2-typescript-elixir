import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/angular2";
import {User, UserService} from './/UserService';

//If we use Rx with Http we have to import them here.
//import {Observable} from 'rxjs/Observable';
//import 'rxjs/operator/map';

@Injectable()
export class HttpUserService implements UserService{
    
	constructor(public http: Http) {
	}
	
    get() : Promise<User[]> {
        
        return new Promise<User[]>((resolve, error) => {
            let users: User[] = [];
            this.http.get('http://localhost:8801/users/')
            .subscribe(r => {
                let a: Array<any> = <Array<any>> r.json();
                a.forEach(b => users.push(new User(b.id, b.name, b.email, b.description)));;                
                resolve(users);
            }, e => { error(e); });
        });
        
        //In an ideal world we could use this
        //However Angular2 is still in Alpha and has problems 
        //import map ... 
        //https://github.com/angular/angular/issues/5749
		/*
        return this.http.get('http://localhost:8801/users/')
			.map(r => <Array<any>> r.json())
            .map(a => {
                let users: User[] = []; 
                a.forEach(u => users.push(new User(u.id, u.name)));;
                return users;        
            })
           .toPromise();
        */
    }
    
    getById(id: string) : Promise<User> {
         return new Promise<User>((resolve, error) => {
            this.http.get('http://localhost:8801/users/' + id)
            .subscribe(r =>  {
                console.log(r.text())
                let u : any = r.json();
                resolve(new User(u.id, u.name, u.email, u.description));
            }, e => { error(e); });
        });
    }
    
    upsert(user: User) : Promise<void> {
         return new Promise<void>((resolve, error) => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            
            if(user.id == null) {
                this.http.post('http://localhost:8801/users/', JSON.stringify(user), {headers: headers})
                .subscribe(r => resolve(), e => error(e));
            } else
            {
                this.http.put('http://localhost:8801/users/' + user.id, JSON.stringify(user), {headers: headers})
                .subscribe(r => resolve(), e => error(e));
            }
        });
    }
    
    delete(user: User) : Promise<void> {
         return new Promise<void>((resolve, error) => {
            this.http.delete('http://localhost:8801/users/' + user.id)
            .subscribe(r => resolve(), e => error(e));
        });
    }
}