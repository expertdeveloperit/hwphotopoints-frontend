import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class ThumbnailsphotoService {


  constructor(private _http : Http ) { }

  public getviewselection(){
		let _url: string="https://api.myjson.com/bins/m17wt";
		return this._http.get(_url)
		.map((response: Response) => {return response.json();});
	}
}