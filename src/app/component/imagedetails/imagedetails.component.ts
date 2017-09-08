import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-imagedetails',
  templateUrl: './imagedetails.component.html',
  styleUrls: ['./imagedetails.component.css']
})
export class ImagedetailsComponent implements OnInit {

 @Input() title:string="View Image"; //--- ===create input for title 

 exifData:boolean;
 fileData:boolean;

  constructor() {
  	this.exifData = false;
  	this.fileData = false;

   }

  ngOnInit() {
  }
  showExifdata(){
  	this.exifData = true;
  }
  showFiledata(){
  	this.fileData = true;

  }
}
