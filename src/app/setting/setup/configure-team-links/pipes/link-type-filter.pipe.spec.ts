import { LinkTypeFilterPipe } from './link-type-filter.pipe';

describe('LinkTypeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new LinkTypeFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should tramsform the link type', () =>{
    const pipe = new LinkTypeFilterPipe();
    expect(pipe.transform("Meeting_Link")).toEqual("Meeting Link");
  })
});
