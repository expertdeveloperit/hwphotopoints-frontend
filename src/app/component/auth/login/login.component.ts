import { Component,Input} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { Router } from '@angular/router'; //--- ==== import for routing
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';//its using for form
import { ValidationService } from '../../../validation.service'; //--=== Validation srevice import for email
import {LoginService} from './login.service';
import { SharedDataService } from '../../../shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent {

// --- vareable defined---
  logininfo: FormGroup;
  error: any[];
  loginerror:string;

  constructor(private router: Router,private _cookieService:CookieService, private formData: FormBuilder, private _loginservice : LoginService, private CmService : SharedDataService){
     //--=== Validation for email and password--===
     this.logininfo = formData.group({
      'email' :['', [Validators.required, ValidationService.emailValidator]],
      'password' :[null,Validators.required],
    })
  }
  //--- get cookiesservice data ---
    getCookie(key: string){
      return this._cookieService.get(key);
  }

  // --===submit form data --===

  onSubmit(logininfo:any){
     this.loginerror = "";
     this._loginservice.logindetails(logininfo).subscribe(res => { 
      if(res.status){
        console.log("user",res.user.role);
        this._cookieService.put("hwUserToken", res.token, '/');
        let user_str = JSON.stringify(res.user);
        this._cookieService.put("userDetail", user_str, '/');
        this.CmService.hitLogin(false,res.user);
        this.router.navigate(['']);

      }else{
        console.log("err");
        this.loginerror = res.error;
      }
    });
  }
}
