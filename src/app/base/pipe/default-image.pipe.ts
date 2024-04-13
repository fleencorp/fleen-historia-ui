import {Pipe, PipeTransform} from '@angular/core';
import {DefaultImageType} from "@app/model/enum";
import {isFalsy} from "@app/shared/helper";

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(url: string = '', imageType: DefaultImageType | string = DefaultImageType.Thumbnail): string {
    // Check if the URL is falsy
    if (isFalsy(url)) {
      // Return a replacement URL based on the image type
      switch (imageType) {
        case DefaultImageType.Thumbnail:
          return 'assets/images/no-thumbnail.jpg'; // Provide the path to your default thumbnail image
        case DefaultImageType.ProfilePhoto:
          return 'assets/images/anonymous.jpg'; // Provide the path to your default profile photo image
        case DefaultImageType.Anonymous:
          return 'assets/images/anonymous.jpg'; // Provide the path to your default profile photo image
        default:
          return '';
      }
    }
    // If the URL is not falsy, return it as is
    return url;
  }

}
