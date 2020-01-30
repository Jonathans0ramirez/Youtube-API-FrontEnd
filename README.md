# FrontEndTestExperimentality

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## :open_file_folder: Documentation

Here the most important elements of the project will be documented.

## Angular Material

Angular material modules

```import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatInputModule } from '@angular/material';```
```import { MatToolbarModule } from '@angular/material/toolbar';```

## Youtube API consumption

The way to consume the API

      youtubeAPI = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyDXJvuh9aNABQE90clBYPe1D2xXIJB4eD4&maxResults=6&q=';

      constructor(public http: HttpClient) { }

      searchVideoInfo (search: string) {
        return this.http.get(this.youtubeAPI + search).pipe(map((response: any) => {
          return response.items;
        }));
      }

## :link: Communication between components

The following service was used to share data between components.

>**Message Service**

    private messageSource = new BehaviorSubject([0]);
    currentMessage = this.messageSource.asObservable();

    changeMessage(message: Array<any>) {
        this.messageSource.next(message)
    }

## app.component

This function is called when `Enter` key is pressed, consumes Youtube API and send the response to video-list component.

    keyDownFunction(event) {
      if(event.keyCode == 13) {
        this.isSearching = true;
          this.youtubeApiService.searchVideoInfo(this.renderer.selectRootElement(this.videoSearchInput.nativeElement).value).subscribe(data => {
            this.isSearching = false;
            this.apiResponse = data;
            this.newMessage(this.apiResponse);
          },(err)=>{
            this.isSearching = false;
            console.log('error',err);
          });
      }
    }

This function is used to send the response to a component.

    newMessage(data: Array<any>) {
      this.transferDataService.changeMessage(data);
    }

## video-list Component

This function gets videoId from selection and reproduces it.

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

## Views

:computer: Desktop | :iphone: Mobile
------------ | -------------
![Doc_DesktopGif](https://user-images.githubusercontent.com/42523266/73419237-5d1b3280-42ec-11ea-97ed-920a5787deb2.gif) | ![Doc_MobileGif](https://user-images.githubusercontent.com/42523266/73419118-f8f86e80-42eb-11ea-9271-a626568306f5.gif)

