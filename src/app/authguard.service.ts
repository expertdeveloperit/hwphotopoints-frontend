import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; //--- ==== import for routing
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AuthGuard {
	constructor(private router: Router, private _cookieService:CookieService) {

	}
	logOut(error) {
		if(error.statusText == "Unauthorized"){
			this._cookieService.remove("hwUserToken",'/');
			this._cookieService.remove("userDetail",'/');
			this.router.navigate(['/login']);
		}
	}
}