import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-account-view',
  styleUrl: './account-view.component.css',
  templateUrl: './account-view.component.html',
})
export class AccountViewComponent {
  readonly accountId = input<string>();
}
