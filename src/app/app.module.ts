import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VideoListComponent } from './video-list/video-list.component'; 
import { MessageService } from './shared/api-data.service';
import { YoutubeService } from './shared/youtube.service';

@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [
    YoutubeService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
