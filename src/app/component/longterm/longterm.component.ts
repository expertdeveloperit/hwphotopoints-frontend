import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LongtermService} from './longterm.service';
import { Observable } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-longterm',
  templateUrl: './longterm.component.html',
  styleUrls: ['./longterm.component.css'],
  providers:[LongtermService]
})
export class LongtermComponent implements OnInit {
// --=== Variable defined--===
 seriesData:any = [];
  loadingimg:boolean;
  years:any = [];
  formData:any = [];
  saplingWidth : string;
  containerWidth:string;
  containerHeight:string;
  constructor(private route:ActivatedRoute, private sphotoService : LongtermService) { 
    this.formData = new FormData();
    this.loadingimg =false;

  }
//--response from service--=== 
  ngOnInit() {
    this.loadingimg =true;
    let URL = 'seriesdetail';
    this.formData.append('seriesname', 'L');
    this.sphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      
    this.seriesData = res.seriesData;
    this.years = res.years;
    this.years = res.years;
    let wid = this.years.length * 200 + 200 ;
    this.saplingWidth = wid.toString()+"px"; 


   

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
        console.log(left);
        $(".view-area").css("top","-"+top+"px");
        $("ul#year-list").css("left","-"+left+"px");
     });
  }
}
