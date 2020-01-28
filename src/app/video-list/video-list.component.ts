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

  //Array of Snippet element of videos$
  videosSnippet: Array<any>;
  
  //Array of Id element of videos$
  videosId: Array<any>;

  //Array of Selected Video
  videoSelected: Array<any>;
  
  subscription: Subscription;

  public video: String;
  public player: any;
  public reframed: Boolean = false;

  isSearching:boolean;

  constructor(private messageService: MessageService) {
    // subscribe to home component messages
    this.isSearching = false;
}

  initIframe(videoId: string) {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.video = videoId; //video id

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
    console.log(video);
    this.videoSelected = video;
  }

  ngOnInit() {
    this.messageService.currentMessage.subscribe(message => { 
      this.videos$ = message; 
      
      if (this.videos$.length > 2) {
        // console.log(this.videos$);
        this.videosSnippet = this.videos$.map((response: any) => {
          return response.snippet;
        });
        // console.log(this.videosSnippet);
        this.videosId = this.videos$.map((response) => {
          return response.id;
        });
        // console.log(this.videosId);
        this.initIframe(this.videosId[0].videoId.toString());
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
