import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card-detail',
  styleUrl: './card-detail.component.css',
  templateUrl: './card-detail.component.html',
})
export class CardDetailComponent {
  readonly cardNumber = input<string>();
}
