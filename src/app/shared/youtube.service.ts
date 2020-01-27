import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  //Complete URI https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyCuoHEgDzAy0YIgSibfyrd4qxy4KHtFqnk&maxResults=6&q=
  youtubeAPI = 'https://googleapis.com/youtube/v3?part=snippet&type=video&key=AIzaSyCuoHEgDzAy0YIgSibfyrd4qxy4KHtFqnk&maxResults=6&q=';

  constructor(public http: HttpClient) { }

  searchVideoInfo (search: string) {
    return this.http.get(this.youtubeAPI + search);
  }
}
