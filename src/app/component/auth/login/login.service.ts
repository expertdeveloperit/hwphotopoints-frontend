import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

    constructor(private _http : Http) {}

  public logindetails(formdata: any){
  	let _url:string = environment.apiEndpoint+'user/login';
  	return this._http.post(_url,formdata)
  	.map((response: Response) => {return response.json();});
  	
  }
}
