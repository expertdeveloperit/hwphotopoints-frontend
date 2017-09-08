import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-thumbnailsphoto',
  templateUrl: './thumbnailsphoto.component.html',
  styleUrls: ['./thumbnailsphoto.component.css']
})
export class ThumbnailsphotoComponent implements OnInit {

  @Input() title:string="View Thumbnails Photo Points"; //--- ===create input for title 

  constructor() { }

  ngOnInit() {
  }

}
