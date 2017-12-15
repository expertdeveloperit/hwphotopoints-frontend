import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';

import {ImageuploadService} from './imageupload.service'; //---import service ---
import {SharedDataService} from '../../shared-data.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css'],
  providers:[ImageuploadService]
})
export class ImageuploadComponent implements OnInit {

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
  message : string;
  userPermissions : boolean;
  uploadValidation : boolean;
  file : string;
  SeriesName : string;
 
  allValuesObject = {};
  constructor(private imageupload : ImageuploadService,public CMService : SharedDataService) {
    this.userPermissions = true;
    this.imageUploded = false;    
    this.imageUplodedStatus = false;
    this.disabledButton =  false;
    this.selectyearoption = false;
    this.selectspringoption = false;
    this.selectlocationoption = false;
    this.selectimagetype = false;
    this.selectview = false;
    this.formSubmit= false;
    this.loadingimg=false;
    this.uploadValidation = false;
    //this.formData = new FormData();    

    if(CMService.currentUser.role == "visitor"){
      this.userPermissions = false;
      this.message = "you don't have permission to access this page."
    }



  }

//--- === this function used for show the title of upload image---
  ngOnInit() {
  }
  chooseFileEnable(){
		 this.fileInput.nativeElement.click()
	}
// ---=== select image send to service ---
  
  uploadFile(event) 
  {   
    this.name = "";
    this.uploadValidation = false;
    this.message = "";
    let fileList = event.target.files; 
    this.file = fileList[0];  
    //this.formData.append('image', file);
         
  	this.logo = event.target.files[0]; 
    let bytes = event.target.files[0].size;
    if(bytes > 20000000){
      this.message = "Image size is greater than 20MB, please select a smaller image size.";
      this.uploadValidation = true;
      return false;
    }

    
    let reader = new FileReader(); 
    reader.onload = (e: any) => {             //---=== this function used for show upload image-name ---
      this.logo = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]); //---=== this function used for show upload image---
    this.imageUplodedStatus = true; //---===when it true it show right(select) section
    let element = event.target; 
  	this.name = element.files[0].name;
  	
    
}
//---=== Right section functionality 

  onItemChange(seriesType){
    this.selectimagetype = false; 
    this.selectview = false; 
    this.selectlocationoption=false;
    this.selectspringoption = false;
    this.selectyearoption = false;
    if(seriesType == ""){
      return false;
    }
    this.loadingimg=true;
      this.SeriesName = seriesType;

    this.allValuesObject['series'] = seriesType;

    this.imageupload.getInfo(this.allValuesObject,'year').subscribe(res => {
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
  onyearChange(year){

     this.selectimagetype = false; 
    this.selectview = false; 
    this.selectlocationoption=false;
    this.selectspringoption = false;
    if(year == ""){
      return false;
    }

   this.allValuesObject['year'] = year ;
    //let SelectedSeries = this.formData.get('series');
    let SelectedSeries = this.SeriesName;
    if(SelectedSeries != "P"){
      this.imageupload.getInfo(this.allValuesObject,'posts').subscribe(res => {
        if(res.posts != null){
            this.allPosts = res.posts;
            this.selectlocationoption=true;
        }
      });
    }else{
      this.selectspringoption = true;
    }
  }

//---on season change
  onSeasonChange(season){
    this.selectimagetype = false; 
    this.selectview = false; 
    this.selectlocationoption=false;
    if(season == ""){
      return false;
    }
    this.loadingimg=true;
    this.allValuesObject['season'] = season;
    this.imageupload.getInfo(this.allValuesObject,'posts').subscribe(res => {
    if(res.posts != null){
        this.allPosts = res.posts;
        this.selectlocationoption=true;
    }
    this.loadingimg=false;
    });
  }

//---on location change show image type

onLocationChange(location){
    this.selectimagetype = false; 
    this.selectview = false; 
    if(location == ""){
      return false;
    }
    this.loadingimg=true;
     this.allValuesObject['location'] = location;
    //let SelectedSeries = this.formData.get('series');
    let SelectedSeries = this.SeriesName;
    if(SelectedSeries != "P"){
      this.loadingimg=false;
      this.formSubmit = true;
    }else{
      this.imageupload.getInfo(this.allValuesObject,'imagetype').subscribe(res => {
        if(res.types != null){
          
          this.allImageType = res.types;
          this.selectimagetype = true; 
        }
        this.loadingimg=false;
      });
    }  
  }

//---on imageType change show view
  
  onImageChange(imageType){
    this.formSubmit = false;
    this.selectview = false;
    if(imageType == ""){
      return false;
    }
    this.loadingimg=true;
    this.allValuesObject['image_view']= imageType ;
      this.imageupload.getInfo(this.allValuesObject,'values').subscribe(res => {
      if(res.values != null){

        this.allvalues = res.values;
        console.log(this.allvalues,"allvalues");
        this.selectview = true;  

          this.allvalues = res.values;
          this.selectview = true;  


      }
      this.loadingimg=false;
    }); 
  }

//---on view
  onViewChange(view){

    if(view == ""){
      return false;
    }
    this.formSubmit = true;
 this.allValuesObject['view'] = view;
  }


  onSubmit(){
    this.formData = new FormData();
    this.formData.append('image', this.file);
    this.formData.append('series',this.allValuesObject['series']);
    this.formData.append('year',this.allValuesObject['year']);
    this.formData.append('season',this.allValuesObject['season']);
    this.formData.append('location',this.allValuesObject['location']);
    this.formData.append('image_view',this.allValuesObject['image_view']);
    this.formData.append('view',this.allValuesObject['view']);  
    this.disabledButton = true;
    this.loadingimg=true;
    this.imageupload.getInfo(this.formData,'uploaddata').subscribe(res => {
      if(res.response == 'succes'){
        this.fileUrl = "";
        this.fileUrl = res.thumbImageUrl;
        this.imageName = res.image_name;
        this.imageId = res.imageId; 
        this.imageUploded = true;
        this.loadingimg=false;
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
    this.logo = "";
    this.name = "";
    this.fileUrl = "";
    this.imageName = "";
    this.imageId = 0; 
  }
}
