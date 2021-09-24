import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureMultimediaComponent } from './configure-multimedia.component';

describe('ConfigureMultimediaComponent', () => {
  let component: ConfigureMultimediaComponent;
  let fixture: ComponentFixture<ConfigureMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureMultimediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
