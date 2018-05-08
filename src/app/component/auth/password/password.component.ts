import { Component,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';//--===its using for form
import { ValidationService } from '../../../validation.service';  //--=== Validation srevice import for email
import {ForgetpasswordService} from './forgetpassword.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers:[ForgetpasswordService]
})
export class PasswordComponent {
	
	@Input() title:string="PASSWORD RECOVERY";
  passwordinfo: FormGroup;
  error : string; 
  success : string;

  constructor( private forgetpassword:ForgetpasswordService, private formData: FormBuilder) {
  //--=== Validation for email--===
    this.passwordinfo = formData.group({
    'email' :['', [Validators.required, ValidationService.emailValidator]],
    })
  }

  // --===submit data on click function --===
  
  onSubmit(passwordinfo:any){
  	this.error = "";
    this.success = "";
      this.forgetpassword.passworddetails(passwordinfo).subscribe(res => { 
        if(res.status == "true"){
          this.success = res.msg;
        }else{
          this.error = res.msg;
        }
    });

  }
}
