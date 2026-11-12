import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavLink {
  readonly path: string;
  readonly label: string;
}

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'CardDemo';
  protected readonly navLinks: readonly NavLink[] = [
    { path: '/sign-on', label: 'Sign On' },
    { path: '/menu', label: 'Main Menu' },
    { path: '/admin', label: 'Admin Menu' },
    { path: '/accounts/view', label: 'Accounts' },
    { path: '/cards/list', label: 'Cards' },
    { path: '/transactions/list', label: 'Transactions' },
    { path: '/billing/pay', label: 'Bill Pay' },
    { path: '/reports', label: 'Reports' },
    { path: '/users/list', label: 'Users' },
  ];
}
