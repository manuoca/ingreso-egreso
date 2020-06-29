import { Pipe, PipeTransform } from '@angular/core';
import { IngresosEgreso } from '../models/ingresos-egresos.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresosEgreso[]): IngresosEgreso[] {
    return items.slice().sort( (a, b) => {
      if( a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
