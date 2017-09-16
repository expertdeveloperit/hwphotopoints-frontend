import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LongtermService} from './longterm.service';

@Component({
  selector: 'app-longterm',
  templateUrl: './longterm.component.html',
  styleUrls: ['./longterm.component.css'],
  providers:[LongtermService]
})
export class LongtermComponent implements OnInit {

  seriesData:any = [];
  
  years:any = [];
  formData:any = [];
  constructor(private route:ActivatedRoute, private lphotoService : LongtermService) { 
    this.formData = new FormData();

  }

  ngOnInit() {
    
    let URL = 'seriesdetail';
    this.formData.append('seriesname', 'L');
    this.lphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      
      this.seriesData = res.seriesData;
      this.years = res.years;
    });   
  }

}
