import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ['.fa-check-circle.valid { color: #28a745; }']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  crearUsuario() {
    // if ( this.registroForm.invalid ) { return; }
    const { nombre, correo, password } = this.registroForm.value;

    Swal.fire({
      title: 'Espere, por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService.crearUsurio( nombre, correo, password)
      .then( credenciales => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(err => {
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
}
