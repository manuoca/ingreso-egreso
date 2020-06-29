import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresosEgreso } from 'src/app/models/ingresos-egresos.model';

import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})

export class EstadisticaComponent implements OnInit {

  ingreso: number;
  egreso: number;

  totalIngreso: number;
  totalEgreso: number;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ingresosEgresos').subscribe( ({ items }) => this.generarEstadistica( items ));
  }

  generarEstadistica( items: IngresosEgreso[] ) {
    this.ingreso = 0;
    this.egreso = 0;

    this.totalIngreso = 0;
    this.totalEgreso = 0;

    for ( const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngreso += item.monto;
        this.ingreso++;
      } else {
        this.totalEgreso += item.monto;
        this.egreso++;
      }
    }
    this.doughnutChartData = [ [this.totalIngreso, this.totalEgreso ] ];
    console.log('doughnutChartData', this.doughnutChartData);
  }

}
