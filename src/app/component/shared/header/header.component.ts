import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //--- ==== import for routing
import {CookieService} from 'angular2-cookie/core';
import {SharedDataService} from '../../../shared-data.service';
@Component({
  selector: 'app-new-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class NewHeaderComponent implements OnInit {


  constructor(private router: Router, private _cookieService:CookieService,public serve : SharedDataService) { 
  	let loggedinUser = this._cookieService.get("hwUserToken");
   		if(loggedinUser){
   			this.serve.hitLogin(false);
   		}else this.serve.hitLogin(true);
  }

  ngOnInit() {

  }


  logoutUser(){
    this.serve.hitLogin(true);
    this._cookieService.remove("hwUserToken",'/');
		this._cookieService.remove("userDetail",'/');
		this.router.navigate(['/login']);
	}
}
