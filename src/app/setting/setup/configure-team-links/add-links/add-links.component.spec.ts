import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinksComponent } from './add-links.component';

describe('AddLinksComponent', () => {
  let component: AddLinksComponent;
  let fixture: ComponentFixture<AddLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
