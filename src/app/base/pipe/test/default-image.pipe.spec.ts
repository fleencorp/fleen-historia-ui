import {DefaultImagePipe} from "@app/base/pipe";
import {DefaultImageType} from "@app/model/enum";

describe('DefaultImagePipe', () => {
  let pipe: DefaultImagePipe;

  beforeEach((): void => {
    pipe = new DefaultImagePipe();
  });

  it('should create an instance', (): void => {
    expect(pipe).toBeTruthy();
  });

  it('should return the URL as is if it is not falsy', (): void => {
    const url: string = 'http://example.com/image.jpg';
    expect(pipe.transform(url)).toEqual(url);
  });

  it('should return the default thumbnail URL if the input URL is falsy and image type is thumbnail', (): void => {
    expect(pipe.transform('', DefaultImageType.Thumbnail)).toEqual('assets/images/no-thumbnail.jpg');
  });

  it('should return the default profile photo URL if the input URL is falsy and image type is profile photo', (): void => {
    expect(pipe.transform('', DefaultImageType.ProfilePhoto)).toEqual('assets/images/anonymous.jpg');
  });

  it('should return the default profile photo URL if the input URL is falsy and image type is anonymous', (): void => {
    expect(pipe.transform('', DefaultImageType.Anonymous)).toEqual('assets/images/anonymous.jpg');
  });

  it('should return an empty string if the input URL is falsy and image type is not recognized', (): void => {
    expect(pipe.transform('', 'Unknown')).toEqual('');
  });
});
