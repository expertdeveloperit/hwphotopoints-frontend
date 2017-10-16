import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //--- ==== import for routing
import {CookieService} from 'angular2-cookie/core';
import {SharedDataService} from '../../../shared-data.service';
// ---===import for animation---===
import { animate, style, state, transition, trigger} from '@angular/core';

@Component({
  selector: 'app-new-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
    animations: [
    trigger("fadeInOut", [
      state("open", style({opacity: 1})),
      state("closed", style({opacity: 0})),
      transition("open <=> closed", animate( "3000ms" )),
    ])
    ]
})
export class NewHeaderComponent implements OnInit {
// ---=== These are animation states---===
  state = 'open';
  timeOutRef;
  userDetail;
// ---=== boolean value defined ---===
  userAuthenticated:boolean;
  // menuiconshow:boolean;

  
  constructor(private router: Router, private _cookieService:CookieService,public serve : SharedDataService) { 
  	let loggedinUser = this._cookieService.get("hwUserToken");
    let currentUser = this._cookieService.get("userDetail");
    
    if(currentUser){

      this.userDetail = JSON.parse(currentUser);
      
    }
    console.log(this.userDetail);
   		if(loggedinUser){
   			this.serve.hitLogin(false,this.userDetail);
   		}else this.serve.hitLogin(true,false);

  }

  ngOnInit() {

  }

  
 
  logoutUser(){
    this.serve.hitLogin(true,false);
    this._cookieService.remove("hwUserToken",'/');
		this._cookieService.remove("userDetail",'/');
		this.router.navigate(['/login']);
	}

}
