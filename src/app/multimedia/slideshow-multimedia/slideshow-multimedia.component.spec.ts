import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowMultimediaComponent } from './slideshow-multimedia.component';

describe('SlideshowMultimediaComponent', () => {
  let component: SlideshowMultimediaComponent;
  let fixture: ComponentFixture<SlideshowMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideshowMultimediaComponent ]
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
});
