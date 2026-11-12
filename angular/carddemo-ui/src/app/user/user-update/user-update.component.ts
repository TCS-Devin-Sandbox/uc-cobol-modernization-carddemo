import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-user-update',
  styleUrl: './user-update.component.css',
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent {
  readonly userId = input<string>();
}
