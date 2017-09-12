import { Component, OnInit } from '@angular/core';
import { PhotopointsService } from './photopoints.service';
@Component({
  selector: 'app-photopoints',
  templateUrl: './photopoints.component.html',
  styleUrls: ['./photopoints.component.css'],
  providers : [PhotopointsService]
})
export class PhotopointsComponent implements OnInit {

  constructor(private _photopointsservice : PhotopointsService ) {}
  pageContent : any = [] ;
  splitNumber :number;
  next:number;
  ngOnInit() {
    this._photopointsservice.getSeriesData().subscribe(res => {
        this.pageContent = res.posts;     
        let length = this.pageContent.length;
        let each = length/3;
        this.splitNumber = Math.floor(each);
        this.next = this.splitNumber + this.splitNumber;
        console.log(each);   
      }, 
      error =>{
        console.log(error);
      } 
    );
  }

}
