import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import { GeneralService } from 'src/app/service/general.service';
import { SlideshowService } from 'src/app/slideshow/slideshow.service';

import { SlideshowMultimediaComponent } from './slideshow-multimedia.component';

describe('SlideshowMultimediaComponent', () => {
  let component: SlideshowMultimediaComponent;
  let fixture: ComponentFixture<SlideshowMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientTestingModule],
      declarations: [ SlideshowMultimediaComponent ],
      providers:[GeneralService, SlideshowService, ElectronService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if it is image or video', () =>{
expect(component.isImage("testing.png")).toEqual(true);
expect(component.isImage("testing.mp4")).toEqual(false);
  })

 /*  it('should check next video',() =>{
    let count = component.currentIndex;
    component.nextVideo();
    expect(component.currentIndex).toEqual(count + 1);
    
  }) */
});
