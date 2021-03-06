import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromAuth from '../auth/auth.actions';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;

  get user() {
    return {...this._user };
  }

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges().subscribe( (firestoreUser: Usuario) => {
          // console.log(firestoreUser);
          // const user = Usuario.fromFirebase(firestoreUser);
          this._user = firestoreUser;
          // const tempuser = new Usuario('masdfa@sdfs.es', 'mansdfa', 'sfasdfasdfasdlfkasd');
          this.store.dispatch( fromAuth.setUser( {user: firestoreUser} ));

        });
      } else {
        // console.log('Llamar unset del user');
        // if (this.userSubscription) {
          this._user = null;
          this.userSubscription.unsubscribe();
          this.store.dispatch( ingresoEgresoActions.unsetItems() );
        // }
        this.store.dispatch( fromAuth.unsetUser());
      }
    });
  }

  crearUsurio( nombre: string, email: string, password: string ) {
    // console.log ({ nombre, email, password });
    return this.auth.auth.createUserWithEmailAndPassword( email, password )
        .then( ({ user }) => {

            const newUser = new Usuario( user.uid, nombre, user.email );

            return this.firestore.doc(`${user.uid}/usuario`)
              .set( {...newUser} );
        });
  }

  loginUsuario( correo: string, password: string ) {
    return this.auth.auth.signInWithEmailAndPassword( correo, password );
  }

  logout() {
    return this.auth.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser !== null )
    );
  }
}
