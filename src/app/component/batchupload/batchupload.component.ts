import { Component, OnInit,ElementRef,ViewChild  } from '@angular/core';
import{BatchuploadService}from './batchupload.service'

@Component({
  selector: 'app-batchupload',
  templateUrl: './batchupload.component.html',
  styleUrls: ['./batchupload.component.css'],
  providers:[BatchuploadService]
})
export class BatchuploadComponent implements OnInit {

//--viewChild defined---
@ViewChild('fileInput') fileInput:ElementRef;
@ViewChild('CsvfileInput') CsvfileInput:ElementRef;

// --===Variable defined --====
  name:string;
  logo:string;
  CsvFile:string;
  CsvName:string;
  formSubmit:boolean;
  loadingimg:boolean;
	formData:any = [];
  imageinfo:any = [];
  imageUploded:boolean;
  fileUrl : string = "";
  imageName : string = "";
  imageId : number ;
  disabledButton: boolean;
  imageUplodedStatus:boolean;
  imagesList :any = [];
  imagesName :any = [];
  CsvUploaded : boolean;
  ImageUploaded : boolean;
  message:string;
  error : string;
// ---constructor--
  constructor(private Batchupload:BatchuploadService ) {
  	this.imageUploded = false; 
    this.imageUplodedStatus = false;   
    this.disabledButton =  false;    
    this.formSubmit= false;
    this.loadingimg=false;
    this.formData = new FormData();  
    this.CsvUploaded = false;
    this.ImageUploaded = false;
   
  }
  chooseFileEnable(){
		 this.fileInput.nativeElement.click()
	}
	choosecsvEnable(){
		this.CsvfileInput.nativeElement.click()
	}
  ngOnInit() {
  }

// --===upload multiple file--===

  uploadFile(event) 
  {   

    this.imagesList = [];
      let fileList = event.target.files; 
      if(fileList.length > 20){
        this.message = "Please select maximum 20 images.";
        return false;
      }
      let fileIndex = [];
      for(let i = 0; i < fileList.length ; i++) {
        let reader = new FileReader(); 
        reader.onload = (e: any) => {    
          this.imagesList.push( e.target.result);
        }

        let file = fileList[i];
        let bytes = event.target.files[i].size;
        console.log(bytes);
        if(bytes < 20000000){
          this.formData.append('fileIndex[]', file);  
          reader.readAsDataURL(event.target.files[i]); //---=== this function used for show upload image---
    	    let element = event.target; 
    	  	this.imagesName.push(element.files[i].name);
        }else{
          this.message = "Image size is greater than 20MB, please select image size less than it.";
        }

      }
      
      this.ImageUploaded = true;  
      
      if(this.CsvUploaded && this.ImageUploaded){
        this.disabledButton = false;
        this.formSubmit = true;
      }
      this.imageUplodedStatus = true;	
	}
// --===CSV file upload--===

	uploadCsvFile(csvevent) 
  	{   
      let fileList = csvevent.target.files; 
      let file = fileList[0];  
      this.formData.append('csv', file);
	    let element = csvevent.target; 
	  	this.CsvName = element.files[0].name;
      this.CsvUploaded = true;  
      if(this.CsvUploaded && this.ImageUploaded){
        this.disabledButton = false;
        this.formSubmit = true;
      }
      this.imageUplodedStatus = true;
	  }

    flushSelectedData(){
      
      this.formData.delete("fileIndex[]");
      this.formData.delete('csv');
      this.imagesList = [];
      this.CsvName = "";
    }

// ---== Submit all images---===
  onSubmit(){
    this.message = "";
    this.error = "";
    this.disabledButton = true;
    this.loadingimg=true;
    this.Batchupload.getInfo(this.formData,'uploadbatchdata').subscribe(res => {
      if(res.status == 'true'){
        this.loadingimg=false;
        this.message = res.msg;
        this.imageUploded = true;
      }else{
          this.loadingimg=false;
          this.error = res.msg;
      }
    });
  }

}
