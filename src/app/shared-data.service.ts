import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {
  data = true;
  constructor() { }
  hitLogin(val:boolean){
  	this.data = val;
  }
}
