import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigureTeamSpiritComponent } from './configure-team-spirit.component';

describe('ConfigureTeamSpiritComponent', () => {
  let component: ConfigureTeamSpiritComponent;
  let fixture: ComponentFixture<ConfigureTeamSpiritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ ConfigureTeamSpiritComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureTeamSpiritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
