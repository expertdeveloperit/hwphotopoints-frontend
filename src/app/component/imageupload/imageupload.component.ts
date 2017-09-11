import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';

import {ImageuploadService} from './imageupload.service'; //---import service ---

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


  constructor(private imageupload : ImageuploadService) {

    this.imageUplodedStatus = false;
    this.selectyearoption = false;
    this.selectspringoption = false;
    this.selectlocationoption = false;
    this.selectimagetype = false;
    this.selectview = false;
    this.formSubmit= false;
    this.loadingimg=false;
    this.formData = new FormData();                     
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

      let fileList = event.target.files; 
      let file = fileList[0];  
      this.formData.append('image', file);
       
  	this.logo = event.target.files[0]; 

    let reader = new FileReader(); 
    reader.onload = (e: any) => {             //---=== this function used for show upload image-name ---
      this.logo = e.target.result;
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
    this.formData.delete('series');
    this.formData.append('series',seriesType);
    
    this.imageupload.getInfo(this.formData,'year').subscribe(res => {
      if(res.years != null){
        this.allYears = [];
        let minYear = parseInt(res.years.year);
        
        let maxYear = minYear + 30;
        this.selectyearoption = true;
        
        for (minYear; minYear < maxYear; minYear++) {
          this.allYears.push(minYear);
        }
      }else {
        let minYear = 2017;        
        let maxYear = 2046;
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

    this.formData.delete('year');
    this.formData.append('year',year);
    this.selectspringoption = true;
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
    this.formData.delete('season');
    this.formData.append('season',season);
    this.imageupload.getInfo(this.formData,'posts').subscribe(res => {
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
    this.formData.delete('location');
    this.formData.append('location',location);
    this.imageupload.getInfo(this.formData,'imagetype').subscribe(res => {
      if(res.types != null){

        this.allImageType = res.types;
        console.log(this.allImageType,"allImageType");
        this.selectimagetype = true; 

          this.allImageType = res.types;
          this.selectimagetype = true; 

      }
      this.loadingimg=false;
    });
  }

//---on imageType change show view
  
  onImageChange(imageType){
    this.formSubmit = false;
    this.selectview = false;
    if(imageType == ""){
      return false;
    }
    this.loadingimg=true;
    this.formData.delete('image_view');
     this.formData.append('image_view',imageType);
      this.imageupload.getInfo(this.formData,'values').subscribe(res => {
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
    this.formData.delete('view');
    this.formData.append('view',view);    
  }


  onSubmit(){

    this.loadingimg=true;
    this.imageupload.getInfo(this.formData,'uploaddata').subscribe(res => {
      if(res.response == 'succes'){
        this.loadingimg=false;
      }
    });
  }
}
