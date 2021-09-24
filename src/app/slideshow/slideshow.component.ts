import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { GeneralService } from '../service/general.service';
import { SlideshowService } from './slideshow.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {




  constructor(public electronService: ElectronService,
    public router: Router, public slideShowService : SlideshowService) 
    {

  
     }

  ngOnInit(): void {
    this.router.navigateByUrl(this.slideShowService.slideshowArray[this.slideShowService.slideshowIndex]);
  }

  

}
