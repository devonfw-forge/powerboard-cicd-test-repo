import { TestBed } from '@angular/core/testing';

import { ConfigureMultimediaServiceService } from './configure-multimedia-service.service';

describe('ConfigureMultimediaServiceService', () => {
  let service: ConfigureMultimediaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureMultimediaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
