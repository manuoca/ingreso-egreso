import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['.fa-check-circle.valid { color: #28a745; }']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUsuario() {
    const { email, password } = this.loginForm.value;

    Swal.fire({
      title: 'Espere, por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService.loginUsuario(email, password)
      .then(credenciales => {
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
    return this.loginForm.get(campoNombre).valid;
  }



}
