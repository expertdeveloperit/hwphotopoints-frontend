import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {CookieService} from 'angular2-cookie/core';
import { AuthGuard } from '../../authguard.service';

@Injectable()
export class LegalPrivacy {

  constructor(private _http : Http, private _cookieService:CookieService , private auth :AuthGuard ) {}

  	public gethomedata(){
  		let token = this._cookieService.get("hwUserToken");
   		
  		let options = new RequestOptions({
	      	headers: new Headers({
		        'Accept': 'application/json',
		        'Authorization':'Bearer'+ token,
			})
	    });
		let _url: string= environment.apiEndpoint+"page/2";
		return this._http.get(_url,options)
		.map((response: Response) => {
			
			return response.json();
		}).catch((error: any) => {
	      if(error.status === 401)          
	      {
	        this.auth.logOut(error); 
	      }
	        return Observable.throw(error)
	    });
	}

}
