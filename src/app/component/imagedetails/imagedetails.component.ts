import { Component, OnInit,Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImageDetailService} from './imagedetails.service';
import 'rxjs/Rx' ;

@Component({
  selector: 'app-imagedetails',
  templateUrl: './imagedetails.component.html',
  styleUrls: ['./imagedetails.component.css'],
  providers : [ImageDetailService]
})
export class ImagedetailsComponent implements OnInit {

 @Input() title:string="View Image"; //--- ===create input for title 

  exifData:boolean;
  fileData:boolean;
  imageId:number = 0;
  imageName : string ="Loading";
  imageUrl : string = "";
  imageID : number ;
  Message : string = "";
  imageView :boolean;
  constructor(private route:ActivatedRoute, private imageDetail : ImageDetailService) {
    this.exifData = false;
    this.fileData = false;
    this.imageView = true;
   }

  ngOnInit(){
    this.imageId = this.route.snapshot.params['id'];
    let URL = 'imagedetail/'+ this.imageId;
    this.imageDetail.getImageInfo(URL).subscribe(res => {
      if(res.status == "true"){
        let mediaInfo = res.mediaInfo;
        this.imageName = mediaInfo.year+'-'+mediaInfo.season+'-'+mediaInfo.series+'-'+mediaInfo.post_name +'-'+mediaInfo.image_view+'-'+mediaInfo.views;
        this.imageId = mediaInfo.id;
        this.imageUrl = mediaInfo.file_location_aws;

      }else{
        this.imageView= false;
        this.Message = res.msg;
        this.imageName = "";
        this.imageId = 0 ;
      }
    });
  }

  // ---=== Delete image ---===
  
  deleteImage(){
     if(this.imageId != 0){
      if(confirm("Are you sure you want to delete this?")){
        this.imageDetail.getImageInfo('deletemedia/'+this.imageId).subscribe(res => {
             if(res.status == "true"){
              this.imageView= false;
              this.Message = res.msg;
             }else{
                this.Message = res.msg;
             } 
        }); 
      }
      else{
          return false;
      }
      
    }
  }

  // ---=== Dawnload Image ---===
  download(downloadLink){
       var blob = new Blob([downloadLink], { type: 'text/csv' });
          var imageUrl= window.URL.createObjectURL(blob);
        window.open(imageUrl);
  }

  // ---=== Show Image data ---=== 

  showExifdata(){
    this.exifData = true;
    this.fileData = false;
  }
  showFiledata(){
    this.fileData = true;
    this.exifData = false;
  }
}
