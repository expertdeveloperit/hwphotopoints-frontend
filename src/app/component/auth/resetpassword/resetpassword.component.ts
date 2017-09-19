import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';//its using for form
import {ActivatedRoute} from '@angular/router';
import {ResetpasswordService} from './resetpassword.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers:[ResetpasswordService]
})
export class ResetpasswordComponent implements OnInit {

resetinfo: FormGroup;
key:string;
error : string;
success:string;
data :any= [];

formVaidate : boolean;
  constructor(private route:ActivatedRoute,private resetpassword:ResetpasswordService,private formData: FormBuilder) {
    this.formVaidate = true;   
   this.resetinfo = formData.group({
      'password' :[null,Validators.required],
      'cpassword' :[null,Validators.required],
      
    })
   }

  ngOnInit() {

    this.key = this.route.snapshot.params['key'];
    let URL = 'resetpassword/key/'+ this.key;
    this.resetpassword.checkkey(URL).subscribe(res => { 
       if(res.status == "false") {
        this.error = res.msg;
        this.formVaidate = false;
       }else{
        this.formVaidate = true;
       }
    });
  }

  onSubmit(resetinfo:any){
    this.error = "";
    
    
    if(resetinfo.password == resetinfo.cpassword){
      this.data = ({key:this.key,password:resetinfo.password});
      let URL = "reset/password";
       this.resetpassword.resetdetails(this.data,URL).subscribe(res => { 
          if(res.status == "true"){
            this.success = res.msg;
          }else{
            this.error = res.msg;
          }
       });
    }else{
      this.error = "Confirm password should be same as Password.";
    }
	}
}