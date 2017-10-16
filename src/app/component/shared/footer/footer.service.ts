import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class FooterService {

  constructor(private _http : Http) { }

    	public getfooterservice(){

		let _url: string= environment.apiEndpoint+"pages/title";
		return this._http.get(_url)
		.map((response: Response) => {
			return response.json();
		})
	   
	}

}
