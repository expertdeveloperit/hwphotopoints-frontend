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
  years : any = [];
  winterData : any = [];
  summerData: any = [];
  springData: any = [];
  autumnData: any = [];
  secondViewsData : any = [];
  secondviewyears:any=[];
  secondViewImagesData :any= [];
  thirdviewyears : any = [];
  thirdViewsData : any = [];
  totalSeason : any[];

  constructor(private route:ActivatedRoute, private sphotoService : ThumbnailsphotoService) { 
  	this.selectfirstoption =true;
  	this.selectsecondoption =false;
  	this.selectthirdoption =false;
    this.formData = new FormData();

  }

  ngOnInit() {
    this.sphotoTitle = this.route.snapshot.params['title'];
    this.getFirstView();    
  } 

  getFirstView(){
    let URL = 'pseriesdetail/firstview';
    this.formData.append('postname', this.sphotoTitle);
    this.sphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      this.winterData = res.winterData;
      this.summerData = res.summerData;
      this.autumnData = res.autumnData;
      this.springData = res.springData;
      this.years = res.years;
    });
  }

 // ---=== View select---====
 firstoption(){
 	  this.selectfirstoption=true;
 	  this.selectsecondoption =false;
  	this.selectthirdoption =false;
    this.getFirstView();  
 }

  secondoption(){
  	this.selectsecondoption =true;
  	this.selectfirstoption =false;
  	this.selectthirdoption =false;

    this.sphotoTitle = this.route.snapshot.params['title'];
    let URL = 'pseriesdetail/secondview';
    this.formData.append('postname', this.sphotoTitle);
    this.sphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      this.secondviewyears = res.years;
      this.secondViewsData = res.ViewsData;
      this.secondViewImagesData = res.information;
     });
  }



  thirdoption(){
  	this.selectthirdoption =true;
  	this.selectsecondoption =false;
  	this.selectfirstoption =false;

    this.sphotoTitle = this.route.snapshot.params['title'];
    let URL = 'pseriesdetail/thirdview';
    this.formData.append('postname', this.sphotoTitle);
    this.sphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      this.thirdviewyears = res.years;
      this.thirdViewsData = res.ViewsData;
      this.totalSeason=["WIN","SPR","SUM","AUT"];
     });
  }

}
