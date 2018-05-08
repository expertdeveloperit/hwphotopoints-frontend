import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import {Updatethumbnailsphotoservice} from './updatethumbnailsphoto.service'; 
import {ActivatedRoute} from '@angular/router';
import {SharedDataService} from '../../shared-data.service';

@Component({
  selector: 'app-updatethumbnailsphoto',
  templateUrl: './updatethumbnailsphoto.component.html',
  styleUrls: ['./updatethumbnailsphoto.component.css'],
  providers:[Updatethumbnailsphotoservice]
})
export class UpdatethumbnailsphotoComponent implements OnInit {

@ViewChild('fileInput') fileInput:ElementRef;
//--- === get response from service by export class (ImageuploadService)--- 
	name:string;
  logo:string;
  imageUplodedStatus:boolean;
  selectyearoption:boolean;
  selectspringoption :boolean;
  selectSeasonoption :boolean;
  selectimagetype:boolean;
  selectlocationoption:boolean;
  selectview:boolean;
  formSubmit:boolean;
  loadingimg:boolean;
	formData:any = [];
  allYears :any= [];
  allPosts:any = [];
  allImageType:any = [];
  allvalues:any = [];
  imageinfo:any = [];
  imageUploded:boolean;
  fileUrl : string = "";
  imageName : string = "";
  imageId : number ;
  disabledButton: boolean;
  allFileData: any=[];
  imageUrl : string;
  imageView : boolean;
  Message : string;
  mediaInfo:any = [];
  pageload:boolean;
  userPermissions:boolean;
  message:string;
  constructor(private route:ActivatedRoute, private updatethumbnails: Updatethumbnailsphotoservice,public CMService : SharedDataService) {
    this.userPermissions = true;
    this.pageload = false;
    this.imageUploded = false;    
    this.imageUplodedStatus = true;
    this.disabledButton =  false;
    this.selectyearoption = true;
    this.selectspringoption = true;
    this.selectlocationoption = true;
    this.selectimagetype = true;
    this.selectview = true;
    this.formSubmit= false;
    this.loadingimg=false;
    this.formData = new FormData(); 
    if(CMService.currentUser.role == "visitor"){
      this.userPermissions = false;
      this.Message = "You don't have permission to access this page.";
    }                    
  }

//--- === this function used for show the title of upload image---
  ngOnInit() {
    this.pageload = true;
    this.imageId = this.route.snapshot.params['id'];
    let URL = 'imagedetail/'+ this.imageId;
    this.updatethumbnails.getImageInfo(URL).subscribe(res => {
      if(res.status == "true"){
        this.allFileData = res.mediaInfo;
        this.mediaInfo = res.mediaInfo;
        if(this.mediaInfo.image_view){
          this.imageName = this.mediaInfo.year+'-'+this.mediaInfo.season+'-'+this.mediaInfo.series+'-'+this.mediaInfo.post_name +'-'+this.mediaInfo.image_view+'-'+this.mediaInfo.views;
        }else{
          this.imageName = this.mediaInfo.year+'-'+this.mediaInfo.series+'-'+this.mediaInfo.post_name;
        }
        this.imageId = this.mediaInfo.id;
        this.imageUrl = this.mediaInfo.file_location_aws;

      }else{
        this.imageView= false;
        this.Message = res.msg;
        this.imageName = "";
        this.imageId = 0 ;
      }
      this.formData.delete('media_id');
      this.formData.append('media_id',this.imageId);

      this.onItemChange(this.mediaInfo.series,false);
      this.onyearChange(this.mediaInfo.year,false);
      this.onSeasonChange(this.mediaInfo.season,false);
      this.onLocationChange(this.mediaInfo.post_name,false);
      if(this.mediaInfo.series =="P"){
        this.onImageChange(this.mediaInfo.image_view,false);
        this.onViewChange(this.mediaInfo.views,false);
      }
      this.pageload = false;
    });



  }
  chooseFileEnable(){
		 this.fileInput.nativeElement.click()
	}
// ---=== select image send to service ---

  uploadFile(event) 
  {   

    let fileList = event.target.files; 
    let file = fileList[0];  
    this.formData.delete('image');
    this.formData.append('image', file);
       
  	this.logo = event.target.files[0]; 

    let reader = new FileReader(); 
    reader.onload = (e: any) => {             //---=== this function used for show upload image-name ---
      this.imageUrl = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]); //---=== this function used for show upload image---
    this.imageUplodedStatus = true; //---===when it true it show right(select) section
    let element = event.target; 
  	this.name = element.files[0].name;
  	if(element.files.length > 0){       

 	 	if(element.files.length > 0){       
 

    }
  }
}
//---=== Right section functionality 

  onItemChange(seriesType,status){
    this.selectimagetype = false; 
    this.selectview = false; 
    this.selectlocationoption=false;
    this.selectspringoption = false;
    this.selectyearoption = false;
    if(seriesType == ""){
      return false;
    }
    if(status){
      this.mediaInfo.year = "";
      this.formSubmit = false;
    }
    this.loadingimg=true;
    this.formData.delete('series');
    this.formData.append('series',seriesType);
    
    this.updatethumbnails.getInfo(this.formData,'year').subscribe(res => {
      if(res.years != null){
        this.allYears = [];
        let minYear = parseInt(res.years.start_year);
        
        let maxYear = minYear + 99;
        this.selectyearoption = true;
        
        for (minYear; minYear < maxYear; minYear++) {
          this.allYears.push(minYear);
        }
      }else {
        let minYear = 2017;        
        let maxYear = 2099;
        this.allYears = [];
        for (minYear; minYear < maxYear; minYear++) {
          this.allYears.push(minYear);
        }
        this.selectyearoption = true;        
      }
        this.loadingimg=false;
    });
    
  }

//---on year change
  onyearChange(year,status){
     this.selectimagetype = false; 
    this.selectview = false; 
    this.selectlocationoption=false;
    this.selectspringoption = false;
    if(year == ""){
      return false;
    }
    if(status){
      this.mediaInfo.season = "";
      this.formSubmit = false;
      this.mediaInfo.post_name = "";
    }
    this.formData.delete('year');
    this.formData.append('year',year);
    let SelectedSeries = this.formData.get('series');
    if(SelectedSeries != "P"){
      this.updatethumbnails.getInfo(this.formData,'posts').subscribe(res => {

        if(res.posts != null){
            this.allPosts = res.posts;
             console.log(this.allPosts,"allPosts");
            this.selectlocationoption=true;
        }
      });
    }else{
      this.selectspringoption = true;
    }
  }

//---on season change
  onSeasonChange(season,status){
    this.selectimagetype = false; 
    this.selectview = false; 
    this.selectlocationoption=false;
    if(season == ""){
      return false;
    }
    if(status){
      this.mediaInfo.post_name = "";
      this.formSubmit = false;
    }
    this.loadingimg=true;
    this.formData.delete('season');
    this.formData.append('season',season);
    this.updatethumbnails.getInfo(this.formData,'posts').subscribe(res => {
    if(res.posts != null){
        this.allPosts = res.posts;

        this.selectlocationoption=true;
    }
    this.loadingimg=false;
    });
  }

//---on location change show image type

onLocationChange(location,status){
  console.log(location,"location");
    this.selectimagetype = false; 
    this.selectview = false; 
    if(location == ""){
      return false;
    }
    if(status){
      this.mediaInfo.image_view = "";
      this.formSubmit = false;
    }
    this.loadingimg=true;
    this.formData.delete('location');
    this.formData.append('location',location);

    let SelectedSeries = this.formData.get('series');
    if(SelectedSeries != "P"){
      this.loadingimg=false;
      this.formSubmit = true;
    }else{
      this.updatethumbnails.getInfo(this.formData,'imagetype').subscribe(res => {
        if(res.types != null){

          this.allImageType = res.types;
          this.selectimagetype = true; 

        }
        this.loadingimg=false;
      });
    }  
  }

//---on imageType change show view
  
  onImageChange(imageType,status){
    this.formSubmit = false;
    this.selectview = false;
    if(imageType == ""){
      return false;
    }
    if(status){
      this.mediaInfo.views = "";
      this.formSubmit = false;
    }
    console.log("imageChange");
    this.loadingimg=true;
    this.formData.delete('image_view');
     this.formData.append('image_view',imageType);
      this.updatethumbnails.getInfo(this.formData,'values').subscribe(res => {
      if(res.values != null){

        this.allvalues = res.values;
        this.selectview = true;  

      }
      this.loadingimg=false;
    }); 
  }

//---on view
  onViewChange(view,status){
    console.log(view,"view");
    if(view == ""){
      this.formSubmit = false;
      return false;
    }
    this.formSubmit = true;
    this.formData.delete('view');
    this.formData.append('view',view);    
  }


  onSubmit(){
    this.disabledButton = false;
    this.loadingimg=true;
    this.updatethumbnails.getInfo(this.formData,'updatemediadata').subscribe(res => {
      if(res.response == 'succes'){
        this.fileUrl = res.thumbImageUrl;
        this.imageName = res.image_name;
        this.imageId = res.imageId; 
        this.imageUploded = true;
        this.loadingimg=false;
        this.disabledButton = false;
      }else{
        this.message = res.msg;
        this.loadingimg=false;
      }

    });
  }

  AddAnotherImage(){
    this.imageUploded = false;
    this.disabledButton = false;
    this.selectimagetype = false; 
    this.selectview = false; 
    this.selectlocationoption=false;
    this.selectspringoption = false;
    this.selectyearoption = false;
    this.imageUrl = "";
    this.name = "";
    this.fileUrl = "";
    this.imageName = "";
    this.imageId = 0; 
  }
}
