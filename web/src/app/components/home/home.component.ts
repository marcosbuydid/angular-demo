import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Session from '../../extensions/session';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout(): void {
    Session.removeToken();
    this.router.navigate(['/login']);
  }
}
