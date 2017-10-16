import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../../shared-data.service'
import { FooterService } from './footer.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers:[FooterService]
})
export class FooterComponent implements OnInit {
  footerTitle : string;
  year : number;
  constructor(private CmService : SharedDataService,private _footerService:FooterService) { }

  ngOnInit() {
    this.year = (new Date()).getFullYear();
  	this._footerService.getfooterservice().subscribe(res => {
  		
  		this.footerTitle = res.data[1];
  	});
  }

}
