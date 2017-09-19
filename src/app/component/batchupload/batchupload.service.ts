import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../../environments/environment';
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { AuthGuard } from '../../authguard.service';
@Injectable()
export class BatchuploadService {

  
  constructor(private _http : Http, private _cookieService:CookieService  , private auth :AuthGuard) {}

// --- === upload image save in database (note:pass perameter with type)---

   public getInfo(formdata: any,url:any){
     let token = this._cookieService.get("hwUserToken");
    let options = new RequestOptions({
      headers: new Headers({
          'Accept': 'application/json',
          'Authorization':'Bearer'+ token,
      })
    });
  	let _url:string =environment.apiEndpoint+url;

   
  	return this._http.post(_url,formdata,options)
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