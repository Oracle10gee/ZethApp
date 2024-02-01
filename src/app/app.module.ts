// Template and Design Created by Iruobe Akhigbe Ayomide
// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatProgressBarModule} from '@angular/material/progress-bar'
// Components
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './core/api/api.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatProgressBarModule,
    MatIconModule
  ],
  exports: [
    SharedModule
  ],
  providers: [ 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
