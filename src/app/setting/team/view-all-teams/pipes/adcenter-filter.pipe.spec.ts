import { ADcenterFilterPipe } from './adcenter-filter.pipe';

describe('ADcenterFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ADcenterFilterPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return correct data',() =>{
    const pipe = new ADcenterFilterPipe();
    expect(pipe.transform("ADC Mumbai")).toEqual("Mumbai");
  })

  it('should return null ',() =>{
    const pipe = new ADcenterFilterPipe();
    expect(pipe.transform(null)).toEqual(null);
  })

  it('should return data for undefined ',() =>{
    const pipe = new ADcenterFilterPipe();
    expect(pipe.transform(undefined)).toEqual(undefined);
  })
});
