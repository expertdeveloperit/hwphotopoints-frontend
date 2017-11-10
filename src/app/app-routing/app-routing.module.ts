import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router'; //--- ==== import for routing
import { AppRoutingRoutingModule } from './app-routing-routing.module';
import {CookieService} from 'angular2-cookie/core';
import {SharedDataService} from '../shared-data.service';

//--- === conponent import for routing
import { LoginComponent } from '../component/auth/login/login.component';
import { HomeComponent } from '../component/home/home.component';
import { ImageuploadComponent } from '../component/imageupload/imageupload.component';
import { PhotopointsComponent } from '../component/photopoints/photopoints.component';
import { ThumbnailsphotoComponent } from '../component/thumbnailsphoto/thumbnailsphoto.component';
import { SaplingsurvivalComponent } from '../component/saplingsurvival/saplingsurvival.component';
import { LongtermComponent } from '../component/longterm/longterm.component';
import { PasswordComponent } from '../component/auth/password/password.component';
import { ImagedetailsComponent } from '../component/imagedetails/imagedetails.component';
import { LegalPrivacyComponent } from '../component/legalprivacy/legalprivacy.component';
import { ResetpasswordComponent } from '../component/auth/resetpassword/resetpassword.component';
import { UpdatethumbnailsphotoComponent } from '../component/updatethumbnailsphoto/updatethumbnailsphoto.component';
import { BatchuploadComponent } from '../component/batchupload/batchupload.component';
import { BatchuploadCsvComponent } from '../component/batchupload-csv/batchupload-csv.component';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {
 
   constructor(private router: Router, private _cookieService:CookieService,private sd: SharedDataService) {}
 
   public canActivate() {
   	
   		let loggedinUser = this._cookieService.get("hwUserToken");
   		if(loggedinUser){
   			return true;
   		}else{	
   			this.router.navigate(['/login']);
          	return false;
   		}      
   }
}


//--- === define routing path 

const appRoutes: Routes = [
	{path:'login', component:LoginComponent },
	{path:'recoverpassword', component:PasswordComponent},
	{path:'reset/password/:key', component:ResetpasswordComponent},
	{path:'', component:HomeComponent,canActivate: [AlwaysAuthGuard]},
	{path:'legalprivacy', component:LegalPrivacyComponent, canActivate: [AlwaysAuthGuard]},
	{path:'imageupload', component:ImageuploadComponent,canActivate: [AlwaysAuthGuard]},
	{path:'photopoints', component:PhotopointsComponent,canActivate: [AlwaysAuthGuard]},
	{path:'thumbnailsphotos/:title', component:ThumbnailsphotoComponent,canActivate: [AlwaysAuthGuard]},
	{path:'saplingsurvival', component:SaplingsurvivalComponent,canActivate: [AlwaysAuthGuard]},
	{path:'longterm', component:LongtermComponent,canActivate: [AlwaysAuthGuard]},
	{path:'imagedetails/:id', component:ImagedetailsComponent,canActivate: [AlwaysAuthGuard]},
	{path:'Updatethumbnails', component:UpdatethumbnailsphotoComponent,canActivate: [AlwaysAuthGuard]},
	{path:'batchimagesupload', component:BatchuploadComponent,canActivate: [AlwaysAuthGuard]},
	{path:'batchuploadcsv', component:BatchuploadCsvComponent,canActivate: [AlwaysAuthGuard]},
	{path:'updateimage/:id', component:UpdatethumbnailsphotoComponent,canActivate: [AlwaysAuthGuard]}

];



@NgModule({
  imports: [CommonModule, AppRoutingRoutingModule,RouterModule.forRoot(appRoutes)],
  declarations: [],
  exports: [ RouterModule ],
  providers: [ AlwaysAuthGuard] 
})
export class AppRoutingModule { }

//--- === export component by routingcomponent and import in app.modole.ts
export const routingcomponent =
	[ 
		HomeComponent,
		LoginComponent,
		PasswordComponent,
		ImageuploadComponent,
		PhotopointsComponent,
		ThumbnailsphotoComponent,
		SaplingsurvivalComponent,
		LongtermComponent,
		ImagedetailsComponent,
		LegalPrivacyComponent,
		ResetpasswordComponent,
		UpdatethumbnailsphotoComponent,
		BatchuploadComponent,
		BatchuploadCsvComponent
	]