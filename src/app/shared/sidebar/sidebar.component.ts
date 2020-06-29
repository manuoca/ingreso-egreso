import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ['.cursor { cursor: pointer }']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public nombreUsuario;
  public infoUsuario: Subscription;

  constructor(
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.infoUsuario = this.store.select('user')
    .pipe( filter(({ user }) => user !== null))
    .subscribe( ( { user } ) => this.nombreUsuario = user.nombre);
  }

  ngOnDestroy() {
    this.infoUsuario.unsubscribe();
  }

  logOut() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    });
  }

}
