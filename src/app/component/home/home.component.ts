import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {SharedDataService} from '../../shared-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService]
})
export class HomeComponent implements OnInit {

  public pageContent: any;
   public temp: any;
  constructor(private _homeservice : HomeService ,public serve : SharedDataService, private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    //this.serve.hitLogin(false);
    this._homeservice.gethomedata()
      .subscribe(res => {
        this.pageContent = res; 
          console.log(this._sanitizer.bypassSecurityTrustHtml(this.pageContent.data.description));   
          this.temp = this._sanitizer.bypassSecurityTrustHtml(this.pageContent.data.description); 
      }, 
      error =>{
        console.log(error);
      } 
    );
  }
}
