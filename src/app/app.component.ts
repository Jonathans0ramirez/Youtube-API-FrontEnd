import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { YoutubeService } from './shared/youtube.service';
import { MessageService } from './shared/api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @ViewChild('videoSearchInput', {static: false}) videoSearchInput: ElementRef;
 
  title = 'FrontEnd-Test-Experimentality';

  apiResponse: Array<any>;
  toSearch = false;
  isSearching = false;

  constructor(private youtubeApiService: YoutubeService, private transferDataService: MessageService, private renderer: Renderer2) {
    this.isSearching = false;
  }

  ngOnInit() { }

  toggleInputSearch() {
    this.toSearch = !this.toSearch;
  }

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

  newMessage(data: Array<any>) {
    this.transferDataService.changeMessage(data);
  }
}
