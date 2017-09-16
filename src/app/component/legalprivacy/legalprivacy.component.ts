import { Component, OnInit } from '@angular/core';
import {LegalPrivacy} from './legalprivacy.service';
import {SharedDataService} from '../../shared-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './legalprivacy.component.html',
  styleUrls: ['./legalprivacy.component.css'],
  providers:[LegalPrivacy]
})
export class LegalPrivacyComponent implements OnInit {

  public pageContent: any;
   public temp: any;
  constructor(private _legalservice : LegalPrivacy ,public serve : SharedDataService, private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.serve.hitLogin(false);
    this._legalservice.gethomedata()
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
