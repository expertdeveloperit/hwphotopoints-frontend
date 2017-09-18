import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';//its using for form
import {ResetpasswordService} from './resetpassword.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers:[ResetpasswordService]
})
export class ResetpasswordComponent implements OnInit {

resetinfo: FormGroup;
  constructor(private resetpassword:ResetpasswordService,private formData: FormBuilder) {

   this.resetinfo = formData.group({
      'password' :[null,Validators.required],
      'cpassword' :[null,Validators.required],
    })
   }

  ngOnInit() {

  }

    onSubmit(resetinfo:any){
     this.resetpassword.resetdetails(resetinfo).subscribe(res => { 
    
    });
	}
}