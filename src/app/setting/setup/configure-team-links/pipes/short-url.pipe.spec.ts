import { ShortUrlPipe } from './short-url.pipe';

describe('ShortUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortUrlPipe();
    expect(pipe).toBeTruthy();
  });

  it('should cut url short', () =>{
    const pipe = new ShortUrlPipe();
    let url = "www.stackoverflowjavacodergithub.com";
    const len = url.length;
    let shortUrl = url.substr(0, 21) + '...' + url.substring(len - 9, len);
    expect(pipe.transform(url)).toEqual(shortUrl);
  })


  it('should give url as it is', () =>{
    const pipe = new ShortUrlPipe();
    let url = "www.stackoverflow.com";
    expect(pipe.transform(url)).toEqual(url);
  })

  it('should give null for null data', () =>{
    const pipe = new ShortUrlPipe();
    expect(pipe.transform(null)).toEqual(null);
  })
});
