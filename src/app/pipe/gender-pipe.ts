import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 1) {
      return 'MASCULINO';
    }
    return 'FEMENINO';
  }

}
