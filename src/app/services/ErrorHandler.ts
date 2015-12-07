import {Router} from 'angular2/router';
import {Injectable} from 'angular2/angular2';

export abstract class ErrorHandler{    
    abstract handleError(message: string);
}

@Injectable()
export class LocalStorageErrorHandler
{
	constructor(private router: Router){
		
	}
	
	handleError(message: string){
		localStorage.setItem("lastError", message);
		this.router.navigate(["/Error"])	
	}
}