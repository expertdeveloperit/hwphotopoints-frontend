import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class ResetpasswordService {

   constructor(private _http : Http) {}

  public resetdetails(formdata: any,url:any){
  	let _url:string = environment.apiEndpoint+url;
  	return this._http.post(_url,formdata)
  	.map((response: Response) => {
      return response.json();
    });
  }

  public checkkey(url:any){
    let _url:string = environment.apiEndpoint+url;
    return this._http.get(_url)
    .map((response: Response) => {
      return response.json();
    });
  }


  
}
