import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {
  data = true;
  currentUser;
  constructor() { }
  hitLogin(val:boolean,user:any){
  	this.data = val;
  	this.currentUser = user;
  }
}
