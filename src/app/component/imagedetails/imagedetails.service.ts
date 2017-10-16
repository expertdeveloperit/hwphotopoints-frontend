import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../../environments/environment';
import {CookieService} from 'angular2-cookie/core';
import { AuthGuard } from '../../authguard.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageDetailService {

  constructor(private _http : Http, private _cookieService:CookieService , private auth :AuthGuard ) {

  }

// --- === upload image save in database (note:pass perameter with type)---

 
   public getImageInfo(url:any){
    let token = this._cookieService.get("hwUserToken");
    let options = new RequestOptions({

      headers: new Headers({
          'Accept': 'application/json',
          'Authorization':'Bearer'+ token
      })
    });
    let _url:string =environment.apiEndpoint+url;

   return this._http.get(_url, options)
    .map((response: Response) => {
      console.log(response.status,"st");
      
      return response.json();

    }).catch((error: any) => {
      if(error.status === 401)          
      {
        this.auth.logOut(error); 
      }
        return Observable.throw(error)
    });
  }

  public getExifInfo(url:any){
   return this._http.get(url)
    .map((response: Response) => {
      return response.json();

    });
  }

}
