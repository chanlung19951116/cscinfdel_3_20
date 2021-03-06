import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 1) {
      return 'ACTIVO';
    }
    return 'INACTIVO';
  }

}
