import { Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  sphotoTitle : any =[];
  formData:any = [];
  pageContent : any = [];
  constructor(private route:ActivatedRoute, private sphotoService : ThumbnailsphotoService) { 
  	this.selectfirstoption =true;
  	this.selectsecondoption =false;
  	this.selectthirdoption =false;
    this.formData = new FormData();

  }

  ngOnInit() {
    this.sphotoTitle = this.route.snapshot.params['title'];
    let URL = 'pseriesdetail/';
    this.formData.append('postname', this.sphotoTitle);
    this.sphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      this.pageContent = res.media;
    });
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
