import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {
	data = true;
  constructor() { }
  clickme(val:boolean){
  	
  	this.data = val;
  }
}
