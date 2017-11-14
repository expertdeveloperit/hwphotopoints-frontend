import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import{BatchuploadCsvService}from './batchupload-csv.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-batchupload-csv',
  templateUrl: './batchupload-csv.component.html',
  styleUrls: ['./batchupload-csv.component.css'],
  providers:[BatchuploadCsvService]
})
export class BatchuploadCsvComponent implements OnInit {

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
  csvformData:any = [];
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
  thisActive : boolean;
  csvUploded : boolean;
  theHtmlString :string;
  backendUrl : string;
// ---constructor--
  constructor(private Batchupload:BatchuploadCsvService ) {
  	this.imageUploded = true; 
    this.csvUploded = false;
    this.imageUplodedStatus = false;   
    this.disabledButton =  false;    
    this.formSubmit= false;
    this.loadingimg=false;
    this.formData = new FormData();  
    this.csvformData = new FormData();  
    this.CsvUploaded = false;
    this.ImageUploaded = false;
    this.thisActive = true;
    

  }
  chooseFileEnable(){
		 this.fileInput.nativeElement.click()
	}
	choosecsvEnable(){
		this.CsvfileInput.nativeElement.click()
	}
  ngOnInit() {
    this.backendUrl = environment.endpoint+"csv-example.csv";
  }

  activeimage(area){
    this.theHtmlString = "";
    this.error = "";
  	if(area == 'img'){
  		this.imageUploded = true;
      this.csvUploded = false;
  		this.thisActive = true;
  	}else{
  		this.imageUploded = false;
      this.csvUploded = true;
  		this.thisActive = false;
  	}
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
      
	    if(this.ImageUploaded){
	        this.disabledButton = false;
	        this.formSubmit = true;
	      }
	    this.imageUplodedStatus = true;	
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
        //var down = res.msg+"Please download this csv file and update it with series information "+"<a class='dwn' style='font-weight:bold;color:#246f24' href='"+res.url+"' download >Click here to download</a>";
        var down = res.msg+" Please download this csv file and update it with series information. " +"<a class='dwn' style='font-weight:bold;color:#246f24' href='"+res.url+"' download >Click here to download</a>";
        this.theHtmlString = down;
        this.imageUploded = false; 
        this.csvUploded = false;
        this.formData.delete("fileIndex[]");
        this.imagesList = [];
        this.formSubmit = false;
      }else{
          this.loadingimg=false;
          this.error = res.msg;
          this.disabledButton = false
      }
    });
  }
// --===CSV file upload--===

	uploadCsvFile(csvevent) 
  	{   
      	let fileList = csvevent.target.files; 
      	let file = fileList[0];  
      	this.csvformData.append('csv', file);
	    let element = csvevent.target; 
	  	this.CsvName = element.files[0].name;
        this.disabledButton = false;
        this.formSubmit = true;
      	this.imageUplodedStatus = true;
	}

    



  onCsvSubmit(){
  	this.message = "";
    this.error = "";
    this.disabledButton = true;
    this.loadingimg=true;
    this.Batchupload.getInfo(this.csvformData,'uploadcsvbatchdata').subscribe(res => {
      if(res.status == 'true'){
        this.loadingimg=false;
        this.theHtmlString  = res.msg;
        this.csvUploded = false;
        this.csvformData.delete('csv');
        this.CsvName = "";
       
      }else{
          this.loadingimg=false;
          this.error = res.msg;
          this.disabledButton = false;
      }
    });
  }

  	flushSelectedData(){
      
      this.formData.delete("fileIndex[]");
      this.csvformData.delete('csv');
      this.imagesList = [];
      this.CsvName = "";
    }
}
