import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card-update',
  styleUrl: './card-update.component.css',
  templateUrl: './card-update.component.html',
})
export class CardUpdateComponent {
  readonly cardNumber = input<string>();
}
