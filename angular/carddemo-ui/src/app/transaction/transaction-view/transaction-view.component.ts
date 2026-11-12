import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-transaction-view',
  styleUrl: './transaction-view.component.css',
  templateUrl: './transaction-view.component.html',
})
export class TransactionViewComponent {
  readonly transactionId = input<string>();
}
