import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ['.cursor { cursor: pointer }']
})
export class SidebarComponent implements OnInit {

  constructor(
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    });
  }

}
