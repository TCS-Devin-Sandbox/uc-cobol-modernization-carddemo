import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-user-delete',
  styleUrl: './user-delete.component.css',
  templateUrl: './user-delete.component.html',
})
export class UserDeleteComponent {
  readonly userId = input<string>();
}
