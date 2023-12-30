import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isValid'
})
export class ValidIfTruthyPipe implements PipeTransform {
  transform(value: any): any {
    return value ? value : '';
  }
}
