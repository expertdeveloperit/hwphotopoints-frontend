import { Component, OnInit,Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ImageDetailService} from './imagedetails.service';
import {SharedDataService} from '../../shared-data.service';

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
  allFileData : any = [];
  exifArray:any = [];
  userPermissions : boolean;
  constructor(private route:ActivatedRoute, private imageDetail : ImageDetailService,public CMService : SharedDataService) {
    this.userPermissions = true;
    this.exifData = false;
    this.fileData = false;
    this.imageView = true;
    console.log(CMService.currentUser.role);
    if(CMService.currentUser.role == "visitor"){
      this.userPermissions = false;
    }
   }

  ngOnInit(){
    this.imageId = this.route.snapshot.params['id'];
    let URL = 'imagedetail/'+ this.imageId;
    this.imageDetail.getImageInfo(URL).subscribe(res => {
      if(res.status == "true"){
        this.allFileData = res.mediaInfo;
        let mediaInfo = res.mediaInfo;
        if(mediaInfo.image_view){
          this.imageName = mediaInfo.year+'-'+mediaInfo.season+'-'+mediaInfo.series+'-'+mediaInfo.post_name +'-'+mediaInfo.image_view+'-'+mediaInfo.views;
        }else{
          this.imageName = mediaInfo.year+'-'+mediaInfo.series+'-'+mediaInfo.post_name;
        }
        this.imageId = mediaInfo.id;
        this.imageUrl = mediaInfo.file_location_aws;
        let url = 'http://wphackstop.com/exif.php?imageurl='+this.imageUrl;
        
        this.imageDetail.getExifInfo(url).subscribe(result => {
          this.exifArray = result;
        });

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
