import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SaplingsurvivalService} from './saplingsurvival.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-saplingsurvival',
  templateUrl: './saplingsurvival.component.html',
  styleUrls: ['./saplingsurvival.component.css'],
  providers:[SaplingsurvivalService]
})
export class SaplingsurvivalComponent implements OnInit {
// --=== Variable defined--===
	seriesData:any = [];
  loadingimg:boolean;
	years:any = [];
	formData:any = [];
  constructor(private route:ActivatedRoute, private sphotoService : SaplingsurvivalService) { 
  	this.formData = new FormData();
    this.loadingimg =false;

  }
//--response from service--=== 
  ngOnInit() {
    this.loadingimg =true;
    let URL = 'seriesdetail';
    this.formData.append('seriesname', 'S');
    this.sphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      
    this.seriesData = res.seriesData;
    this.years = res.years;
    Observable.interval(1000)
      .takeWhile(() => this.loadingimg =false)
      .subscribe(i => {     
      })
    });   
  }
}
