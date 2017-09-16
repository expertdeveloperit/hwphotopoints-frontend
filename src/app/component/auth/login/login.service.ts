import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { AuthGuard } from '../../../authguard.service';


@Injectable()
export class LoginService {
	
    constructor(private _http : Http, private auth :AuthGuard) {}

  public logindetails(formdata: any){
  	let _url:string = environment.apiEndpoint+'user/login';
  	return this._http.post(_url,formdata)
  	.map((response: Response) => {
      return response.json();
    }).catch((error: any) => {
        if(error.status === 401)          
        {
        	return Observable.throw(error)
        }
          
      });
}
}