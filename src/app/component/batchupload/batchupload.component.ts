import { Component, OnInit,ElementRef,ViewChild  } from '@angular/core';
import{BatchuploadService}from './batchupload.service'

@Component({
  selector: 'app-batchupload',
  templateUrl: './batchupload.component.html',
  styleUrls: ['./batchupload.component.css'],
  providers:[BatchuploadService]
})
export class BatchuploadComponent implements OnInit {

@ViewChild('fileInput') fileInput:ElementRef;
@ViewChild('CsvfileInput') CsvfileInput:ElementRef;
  name:string;
  logo:string;
  CsvFile:string;
  CsvName:string;
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


  constructor(private Batchupload:BatchuploadService ) {
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
    this.formData = new FormData();  
  }
  chooseFileEnable(){
		 this.fileInput.nativeElement.click()
	}
	choosecsvEnable(){
		this.CsvfileInput.nativeElement.click()
	}
  ngOnInit() {
  }
    uploadFile(event) 
  {   

      let fileList = event.target.files; 
      let file = fileList[0];  
      this.formData.append('image', file);
       
	  	//this.logo = event.target.files[0]; 

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

	uploadCsvFile(csvevent) 
  	{   

      let fileList = csvevent.target.files; 
      let file = fileList[0];  
      this.formData.append('CSV', file);
       
	  	this.CsvFile = csvevent.target.files[0]; 

	    let reader = new FileReader(); 
	    reader.onload = (e: any) => {             //---=== this function used for show upload image-name ---
	      this.CsvFile = e.target.result;
	    }
	    reader.readAsDataURL(csvevent.target.files[0]); //---=== this function used for show upload image---
	    this.imageUplodedStatus = true; //---===when it true it show right(select) section
	    let element = csvevent.target; 
	  	this.CsvName = element.files[0].name;
	  	if(element.files.length > 0){       

	 	 	if(element.files.length > 0){       
	 

	    }
	  }
	}



  onSubmit(){
    this.disabledButton = true;
    this.loadingimg=true;
    this.Batchupload.getInfo(this.formData,'uploaddata').subscribe(res => {
      if(res.response == 'succes'){
        this.fileUrl = res.thumbImageUrl;
        this.imageName = res.image_name;
        this.imageId = res.imageId; 
        this.imageUploded = true;
        this.loadingimg=false;
      }
    });
  }

}
