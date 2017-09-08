import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService]
})
export class HomeComponent implements OnInit {

  public pageContent: any;

  constructor(private _homeservice : HomeService ) {}

  ngOnInit() {
    this._homeservice.gethomedata()
      .subscribe(res => {
        this.pageContent = res;        
      }, 
      error =>{
        console.log(error);
      } 
    );
  }
}
