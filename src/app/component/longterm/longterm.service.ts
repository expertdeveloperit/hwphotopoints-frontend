import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { AuthGuard } from '../../authguard.service';

@Injectable()
export class LongtermService {

  constructor(private _http : Http, private auth :AuthGuard ) {  }

  public getlongtermdata(){
		let _url: string="https://api.myjson.com/bins/m17wt";
		return this._http.get(_url)
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
