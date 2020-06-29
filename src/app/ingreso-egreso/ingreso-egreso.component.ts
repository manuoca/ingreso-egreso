import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresosEgreso } from '../models/ingresos-egresos.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo = 'ingreso';
  cargando = false;
  loadingSubs: Subscription;

  constructor( private fb: FormBuilder,
               private ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState> ) { }

  ngOnInit() {

    // this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
    this.loadingSubs = this.store.select('ui').subscribe( ({ isLoading }) =>
    {
      console.log('sub');
      this.cargando = isLoading;
    });

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

  guardar() {
    this.store.dispatch( ui.isLoading() );

    console.log('1');
    if (this.ingresoForm.invalid) { return; }
console.log('2');

    const { descripcion, monto } = this.ingresoForm.value;

    console.log('descripcion', descripcion);

    const ingresoEgreso = new IngresosEgreso(descripcion, monto, this.tipo);
    console.log('ingresoEgreso11', ingresoEgreso);

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.ingresoForm.reset();
        this.store.dispatch( ui.stopLoading() );
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire('Error', err.message , 'error');
      });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
