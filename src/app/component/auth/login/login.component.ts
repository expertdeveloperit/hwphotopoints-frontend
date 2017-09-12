import { Component, OnInit,Input , } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router } from '@angular/router'; //--- ==== import for routing
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';//its using for form
import { ValidationService } from '../../../validation.service';
import {LoginService} from './login.service';
import {CommonService} from '../../../common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService, CommonService]
})
export class LoginComponent implements OnInit {

	


  logininfo: FormGroup;
  constructor(private router: Router,private _cookieService:CookieService, private formData: FormBuilder, private _loginservice : LoginService,public commmonService : CommonService){
     this.logininfo = formData.group({
      'email' :['', [Validators.required, ValidationService.emailValidator]],
      'password' :[null,Validators.required],

    })
  }
    getCookie(key: string){
      return this._cookieService.get(key);
  }

  ngOnInit() {
     this.commmonService.msgChanged("Have changed");
  }

  onSubmit(logininfo:any){
     this._loginservice.logindetails(logininfo).subscribe(res => {
      
      this._cookieService.put("hwUserToken", res.token, '/');
      let user_str = JSON.stringify(res.user);
      this._cookieService.put("userDetail", user_str, '/');

      this.commmonService.msgChanged("Have changed");

      this.router.navigate(['']);


    });
    
    
 
  }
}
