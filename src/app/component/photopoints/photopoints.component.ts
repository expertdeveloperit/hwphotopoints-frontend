import { Component, OnInit } from '@angular/core';
import { PhotopointsService } from './photopoints.service';
@Component({
  selector: 'app-photopoints',
  templateUrl: './photopoints.component.html',
  styleUrls: ['./photopoints.component.css'],
  providers : [PhotopointsService]
})
export class PhotopointsComponent implements OnInit {

  pageContent : any = [] ;
  splitNumber :number;
  next:number;
  loadingimg:boolean;
  constructor(private _photopointsservice : PhotopointsService ) {
    this.loadingimg = true;
  }


  ngOnInit() {
    this._photopointsservice.getSeriesData().subscribe(res => {
        this.pageContent = res.posts;     
        let length = this.pageContent.length;
        let each = length/3;
        this.splitNumber = Math.floor(each);
        
        if(length < 6){
          this.splitNumber = 6;
        }
        this.next = this.splitNumber + this.splitNumber;
         this.loadingimg = false;     
      }, 
      error =>{
        console.log(error);
      } 
    );
  }

}
