import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureMultimediaSubfolderComponent } from './configure-multimedia-subfolder.component';

describe('ConfigureMultimediaSubfolderComponent', () => {
  let component: ConfigureMultimediaSubfolderComponent;
  let fixture: ComponentFixture<ConfigureMultimediaSubfolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureMultimediaSubfolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureMultimediaSubfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
