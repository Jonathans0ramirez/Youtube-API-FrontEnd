import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import reframe from 'reframe.js';

import { MessageService } from '../shared/api-data.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.sass']
})
export class VideoListComponent implements OnInit {
  //Array from app-component (search bar)
  videos$: Array<any>;

  //Processed array of videos$
  videos: Array<any>;
  
  //Array of elements of Id object of videos$
  IdElementVideo: Array<any>;

  //Array of Selected Video
  videoSelected: Array<any>;

  //Variables Youtube-API
  public video: String;
  public player: any;
  public reframed: Boolean = false;

  isSearching:boolean;

  constructor(private messageService: MessageService) {
    // subscribe to home component messages
    this.isSearching = false;
}

  initIframe() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    console.log(this.video);

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.player = new window['YT'].Player('player', {
        videoId: this.video,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              reframe(e.target.a);
            }
          }
        }
      });
    };
  }

  selectVideo(video: any) {
    if(!(video instanceof Array)){
      video = [video];
    } 
    this.videoSelected = video[0];
    for (const obj of this.videos) {
      if (obj == this.videoSelected) {
        obj.isSelected = true;
      } else {
        obj.isSelected = false;
      }
      
    }
    this.IdElementVideo = video.map((response) => {
      return response.id.videoId;
    });
    this.video = this.IdElementVideo.toString();
    this.player.loadVideoById(this.video);      
  }

  ngOnInit() {
    this.messageService.currentMessage.subscribe(message => { 
      this.videos$ = message; 
      console.log(this.videos$);
      if (this.videos$.length > 2) {
        // console.log(this.videos$);
        this.videos = this.videos$.map((response: any) => {
          return response;
        });
        // console.log(this.videosSnippet);
        this.IdElementVideo = this.videos$.map((response) => {
          return response.id;
        });
        // console.log(this.videosId);
        this.video = this.IdElementVideo[0].videoId.toString();
        this.videos$[0].isSelected = true;
        this.videoSelected = this.videos$[0];
        this.initIframe();
      }
    });
    
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };
  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}