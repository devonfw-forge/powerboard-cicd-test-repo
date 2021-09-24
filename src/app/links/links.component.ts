
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebviewTag } from 'electron';
import { ElectronService } from 'ngx-electron';
import { LinkResponse } from '../model/general.model';
import { SlideshowService } from '../slideshow/slideshow.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  public src: string;
  teamLinks: LinkResponse[] = [];
  isElectronRunning: boolean;
  webview: WebviewTag;
  skypeUrl: string;
  public loading = false;
  counter: number = 1;
  webLinksIndex: number[];
  intervalID: any;
  interval= environment.slideshowInterval;

  constructor(private electronService: ElectronService, private ref: ChangeDetectorRef, public slideshowService: SlideshowService) {
    this.src = '';
    this.teamLinks = [];
    this.webLinksIndex = [];
    if (electronService.isElectronApp) {
      // Do electron stuff
      this.isElectronRunning = true;
    } else {
      // Do other web stuff
      this.isElectronRunning = false;
    }
  }

  ngOnInit(): void {
    this.getLinks();

  }

  ngAfterViewInit() {
    if (this.isElectronRunning) {
      // this.getLinks()
      console.log("I am not suppose to be present here");
      this.webview = document.querySelector('webview');

      this.webview.setAttribute('src', this.src);
      // Loading
      this.webview.addEventListener('did-start-loading', (e) => {
        this.loading = true;
        this.ref.detectChanges();

        this.webview.addEventListener('did-stop-loading', (e) => {
          this.loading = false;
          const target: any = e.target;

          this.ref.detectChanges();
        });
      });

      if (this.webLinksIndex.length === 1 && this.slideshowService.isSlideshowRunning) {
        setTimeout(() => {

          this.slideshowService.moveSlideshowNextComponent();

        }, this.interval);
      }
      else if (this.webLinksIndex.length != 1 && this.slideshowService.isSlideshowRunning) {
        this.automateWebLinks(this.interval);
      }
    }
  }


  public getLinks() {
    this.webLinksIndex = [];
    let i = 0;
    this.teamLinks = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.teamLinks;
    for (i = 0; i < this.teamLinks.length; i++) {
      if (this.teamLinks[i].linkType === 'web_link') {
        this.webLinksIndex.push(i);
        if (this.src === '') {
          this.src = this.teamLinks[i].links;

        }

      }
    }
    console.log(this.webLinksIndex.length);
  }

  automateWebLinks(interval: number) {

    this.intervalID = setInterval(() => this.openLink(this.teamLinks[this.webLinksIndex[this.counter]].links), interval);
  }

  openMeetingLink(meetingLink: string) {
    if (!this.isElectronRunning) {
      window.open(meetingLink, '_blank');
    } else {
      let myWindow = window.open(meetingLink, '_system');
      setTimeout(() => {
        myWindow.close();
      }, 5000);
    }
  }

  openLink(link: string) {
    console.log(link);
    console.log(this.webLinksIndex[this.counter]);
    if (!this.isElectronRunning) {
      let myWindow = window.open(link, "myWindow", "width=1000,height=1000");
    }
    else {
      this.src = link;
      this.webview.setAttribute('src', link);
      this.ref.detectChanges();

      if (this.counter === this.webLinksIndex.length - 1) {
        console.log("automate done");

        clearInterval(this.intervalID);
        setTimeout(() => {
          if (this.slideshowService.isSlideshowRunning) {
            this.slideshowService.moveSlideshowNextComponent();
          }
        }, this.interval);

      }
      else {
        this.counter = this.counter + 1;
        if (this.counter === 1) {
          this.automateWebLinks(this.interval);
        }

        console.log(this.counter);
      }
    }
  }

  ngOnDestroy() {
    if (this.intervalID) {
      this.counter = 0;
      clearInterval(this.intervalID);
    }
  }

}
