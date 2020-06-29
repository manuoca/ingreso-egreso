import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresosEgreso } from '../models/ingresos-egresos.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService ) { }

  crearIngresoEgreso( ingresoEgreso: IngresosEgreso) {
    const uid = this.authService.user.uid;

    delete ingresoEgreso.uid;

    return this.firestore.doc(`${ uid }/ingresos-egresos`)
        .collection('items')
        .add( {...ingresoEgreso} )
        .then( (ref) => console.log('exito!', ref))
        .catch( err => console.warn(err));
  }

  initIngresosEgresosListener( uid: string ) {
    return this.firestore.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(  snapshot => snapshot.map( (doc) => ({
              ...doc.payload.doc.data(),
              uid: doc.payload.doc.id
            }) as IngresosEgreso
          )
        )
      );
  }

  borrarIngresoEgreso( uidItem: string) {

    const uid = this.authService.user.uid;

    return this.firestore.doc(`${ uid }/ingresos-egresos/items/${uidItem}`).delete();
  }
}
