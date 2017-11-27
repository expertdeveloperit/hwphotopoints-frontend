import { Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ThumbnailsphotoService} from './thumbnailsphoto.service';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-thumbnailsphoto',
  templateUrl: './thumbnailsphoto.component.html',
  styleUrls: ['./thumbnailsphoto.component.css'],
  providers: [ThumbnailsphotoService]
})
export class ThumbnailsphotoComponent implements OnInit {

  @Input() title:string="View Thumbnails Photo Points"; //--- ===create input for title 
//--=== variable defined --===
  selectsecondoption:boolean;
  selectfirstoption:boolean;
  selectthirdoption:boolean;
  loadingimg:boolean;
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
  thirdViewWidth:string;
  secondViewWidth:string;
  firstViewWidth:string;
  seasonOrder : any =[];
  containerWidth:string;
  containerHeight:string;
  constructor(private route:ActivatedRoute, private sphotoService : ThumbnailsphotoService) { 
  	this.selectfirstoption =true;
  	this.selectsecondoption =false;
  	this.selectthirdoption =false;
    this.loadingimg =false;
    this.formData = new FormData();
    this.seasonOrder.push('Winter','Spring','Summer','Autumn');
    
  }

  ngOnInit() {
    this.sphotoTitle = this.route.snapshot.params['title'];
    this.getFirstView();    
  } 
// --- responce from service---===
  getFirstView(){
    this.loadingimg =true;
    let URL = 'pseriesdetail/firstview';
    this.formData.append('postname', this.sphotoTitle);
    this.sphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      this.winterData = "";
      this.summerData = "";
      this.autumnData = "";
      this.springData = "";
      this.winterData = res.winterData;
      this.summerData = res.summerData;
      this.autumnData = res.autumnData;
      this.springData = res.springData;
      this.years = res.years;
      let wid = this.years.length * 190 + 200 ;
      console.log(wid,"wid");
      this.firstViewWidth = wid.toString()+"px";
      Observable.interval(1000)
      .takeWhile(() => this.loadingimg =false)
      .subscribe(i => {     
      })
    });
  }

 // ---=== first View option select---====
 firstoption(){
 	  this.selectfirstoption=true;
 	  this.selectsecondoption =false;
  	this.selectthirdoption =false;
    this.getFirstView();  
 }
// ---=== secondoption select---====
  secondoption(){
    this.loadingimg =true;
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
       let wid = this.secondviewyears.length * 185 +200;
      this.secondViewWidth = wid.toString()+"px";
       Observable.interval(1000)
      .takeWhile(() => this.loadingimg =false)
      .subscribe(i => { 
          
      })
     });
  }
// ---=== thirdoption select---==== 
  thirdoption(){
    this.loadingimg =true;
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
      let wid = this.thirdviewyears.length * 900 ;
      this.thirdViewWidth = wid.toString()+"px";
      console.log(this.thirdViewWidth);
      Observable.interval(1000)
      .takeWhile(() => this.loadingimg =false)
      .subscribe(i => { 
          
      })
      
     });
  }

  ngAfterViewChecked() {
      var wid = $(window).height() - 100;
      var hei = $(window).width();
       this.containerHeight = wid.toString()+"px";
       this.containerWidth = hei.toString()+"px";
       
       $('#sarea').scroll(function(){
     
        var left = $(this).scrollLeft();
        var top = $(this).scrollTop();
        $(".season-view-list").css("top","-"+top+"px");
        $("#year-list,.year-season").css("left","-"+left+"px");
     });
  }


}
