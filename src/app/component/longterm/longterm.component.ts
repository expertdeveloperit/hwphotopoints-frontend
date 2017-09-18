import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LongtermService} from './longterm.service';
import { Observable } from 'rxjs';

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

  constructor(private route:ActivatedRoute, private lphotoService : LongtermService) { 
    this.formData = new FormData();
    this.loadingimg =false;
  }
//--response from service--=== 
  ngOnInit() {
    this.loadingimg =true;
    let URL = 'seriesdetail';
    this.formData.append('seriesname', 'L');
    this.lphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      
      this.seriesData = res.seriesData;
      this.years = res.years;
       Observable.interval(1000)
      .takeWhile(() => this.loadingimg =false)
      .subscribe(i => {     
      })
    });   
  }
}
