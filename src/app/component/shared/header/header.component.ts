import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //--- ==== import for routing
import {CookieService} from 'angular2-cookie/core';
import { HeaderService } from './header.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers :[HeaderService]
})
export class HeaderComponent implements OnInit {
userAuthenticated:boolean;
  constructor(private router: Router, private _cookieService:CookieService,private _headerService : HeaderService) {
  	this.userAuthenticated=false;
  	let loggedinUser = this._cookieService.get("hwUserToken");
   		if(loggedinUser){
   			this.userAuthenticated=true;
   		}


   }

  ngOnInit() {
    
  }
	logoutUser(){
    this.userAuthenticated = false;
		this._cookieService.remove("hwUserToken",'/');
		this._cookieService.remove("userDetail",'/');
		this.router.navigate(['/login']);
	}
}
