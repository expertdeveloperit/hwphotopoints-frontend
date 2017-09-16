import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SaplingsurvivalService} from './saplingsurvival.service';


@Component({
  selector: 'app-saplingsurvival',
  templateUrl: './saplingsurvival.component.html',
  styleUrls: ['./saplingsurvival.component.css'],
  providers:[SaplingsurvivalService]
})
export class SaplingsurvivalComponent implements OnInit {

	seriesData:any = [];
	
	years:any = [];
	formData:any = [];
  constructor(private route:ActivatedRoute, private sphotoService : SaplingsurvivalService) { 
  	this.formData = new FormData();

  }

  ngOnInit() {
    
    let URL = 'seriesdetail';
    this.formData.append('seriesname', 'S');
    this.sphotoService.thumbnailsphotoinfo(this.formData,URL).subscribe(res => {
      
      this.seriesData = res.seriesData;
      this.years = res.years;
    });   
  }

}
