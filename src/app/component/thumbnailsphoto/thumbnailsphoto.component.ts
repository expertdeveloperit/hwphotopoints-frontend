import { Component, OnInit, Input} from '@angular/core';
import {ThumbnailsphotoService} from './thumbnailsphoto.service';

@Component({
  selector: 'app-thumbnailsphoto',
  templateUrl: './thumbnailsphoto.component.html',
  styleUrls: ['./thumbnailsphoto.component.css'],
  providers: [ThumbnailsphotoService]
})
export class ThumbnailsphotoComponent implements OnInit {

  @Input() title:string="View Thumbnails Photo Points"; //--- ===create input for title 

  selectsecondoption:boolean;
  selectfirstoption:boolean;
  selectthirdoption:boolean;

  constructor(private _sphotoService : ThumbnailsphotoService) { 
  	this.selectfirstoption =true;
  	this.selectsecondoption =false;
  	this.selectthirdoption =false
  }

  ngOnInit() {
  }

 // ---=== View select---====
 firstoption(){
 	this.selectfirstoption=true;
 	this.selectsecondoption =false;
  	this.selectthirdoption =false;

 }

  secondoption(){
  	this.selectsecondoption =true;
  	this.selectfirstoption =false;
  	this.selectthirdoption =false;
  }
  thirdoption(){
  	this.selectthirdoption =true;
  	this.selectsecondoption =false;
  	this.selectfirstoption =false;
  }

}
