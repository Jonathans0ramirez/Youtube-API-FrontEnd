import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  youtubeAPI = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyDXJvuh9aNABQE90clBYPe1D2xXIJB4eD4&maxResults=6&q=';

  constructor(public http: HttpClient) { }

  searchVideoInfo (search: string) {
    return this.http.get(this.youtubeAPI + search).pipe(map((response: any) => {
      return response.items;
    }));
  }
}
