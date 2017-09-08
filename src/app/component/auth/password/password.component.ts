import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
	
	@Input() title:string="Forget Password";
  constructor() { }

  ngOnInit() {
  }
  onSubmit(passwordinfo:any){
  	console.log(passwordinfo);

  }
}
