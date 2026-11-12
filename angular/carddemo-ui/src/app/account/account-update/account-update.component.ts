import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-account-update',
  styleUrl: './account-update.component.css',
  templateUrl: './account-update.component.html',
})
export class AccountUpdateComponent {
  readonly accountId = input<string>();
}
