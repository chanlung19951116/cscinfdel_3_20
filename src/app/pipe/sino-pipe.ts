import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sino'
})
export class SinoPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 1) {
      return 'SI';
    }
    return 'NO';
  }

}
