import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';//its using for form
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';//its module using for routes
import { AppRoutingModule } from './app-routing/app-routing.module';
import { routingcomponent } from './app-routing/app-routing.module';//---import component by app-routing module
import { AppComponent } from './app.component';
import { SharedDataService } from './shared-data.service'
//---=== import cookeieservice  
import {CookieService} from 'angular2-cookie/core';

//--- === Shared component import

import { FooterComponent } from './component/shared/footer/footer.component';
import { AuthGuard } from './authguard.service';
import { NewHeaderComponent } from './component/shared/header/header.component';




@NgModule({
  declarations: [
    AppComponent, 
    routingcomponent,
    FooterComponent,
    NewHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,SharedDataService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
