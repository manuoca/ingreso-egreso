import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ['.fa-check-circle.valid { color: #28a745; }']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor(
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe( state => {
      console.log('escuchando cambios en ui state');
      this.cargando = state.isLoading;
    });
  }

  crearUsuario() {
    this.store.dispatch( ui.isLoading() );
    // Swal.fire({
      //   title: 'Espere, por favor',
      //   onBeforeOpen: () => {
        //     Swal.showLoading();
        //   },
        // });

    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsurio( nombre, correo, password)
      .then( credenciales => {
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }

  checkValid(campoNombre: string): boolean {
    return this.registroForm.get(campoNombre).valid;
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
