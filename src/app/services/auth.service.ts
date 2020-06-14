import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore ) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      console.log( fuser );
      console.log( fuser ? fuser.uid : undefined );
      console.log( fuser ? fuser.email : undefined );
    });
  }

  crearUsurio( nombre: string, email: string, password: string ) {
    // console.log ({ nombre, email, password });
    return this.auth.auth.createUserWithEmailAndPassword( email, password )
        .then( ({ user }) => {

            const newUser = new Usuario( user.uid, nombre, user.email );

            console.log('1', newUser);
            console.log('2', {...newUser});

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
