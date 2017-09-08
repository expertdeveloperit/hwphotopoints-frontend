import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../../environments/environment';
import {CookieService} from 'angular2-cookie/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageuploadService {

  constructor(private _http : Http, private _cookieService:CookieService  ) {}

// --- === upload image save in database (note:pass perameter with type)---

  public uploadimage(formdata: any){
  	let _url:string ='http//localhost/';
  	return this._http.post(_url,formdata)
  	
  }
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
    .map((response: Response) => {return response.json();});
  }


}
