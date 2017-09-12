import { Component, OnInit } from '@angular/core';
import {LongtermService} from './longterm.service';

@Component({
  selector: 'app-longterm',
  templateUrl: './longterm.component.html',
  styleUrls: ['./longterm.component.css'],
  providers:[LongtermService]
})
export class LongtermComponent implements OnInit {

   public longtermdata: any;

  constructor(private _longtermService : LongtermService) {}

  ngOnInit() { }

  public longtermdatashow(){
    	this._longtermService.getlongtermdata()
    	.subscribe(res => {this.longtermdata=res;
    		console.log(this.longtermdata);
    	}, 
    	error =>{
    		console.log(error);
    	}	
    	);
  	}
}
