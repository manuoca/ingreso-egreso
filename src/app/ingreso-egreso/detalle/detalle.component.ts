import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresosEgreso } from 'src/app/models/ingresos-egresos.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresosEgreso[];
  ingresosSubs: Subscription;

  constructor( private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresosSubs = this.store.select('ingresosEgresos').subscribe( ({ items }) => {
      this.ingresosEgresos = items
    })
  }
  ngOnDestroy() {
    this.ingresosSubs.unsubscribe();
  }

  borrar( uid: string ){
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then( () => Swal.fire('Borrado', 'Item Borrado', 'success'))
    .catch( err => Swal.fire('Error', err.message , 'error'))
  }

}
