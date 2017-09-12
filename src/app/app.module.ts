import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';//its using for form
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';//its module using for routes
import { AppRoutingModule } from './app-routing/app-routing.module';
import { routingcomponent } from './app-routing/app-routing.module';//---import component by app-routing module
import { AppComponent } from './app.component';

//---=== import cookeieservice  
import { CookieService } from 'angular2-cookie/services/cookies.service';

//--- === Shared component import
import { HeaderComponent } from './component/shared/header/header.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { AuthGuard } from './authguard.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingcomponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [CookieService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
