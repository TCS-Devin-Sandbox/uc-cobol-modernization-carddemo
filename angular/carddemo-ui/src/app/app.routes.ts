import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-on' },
  {
    path: 'sign-on',
    title: 'Sign On',
    loadComponent: () => import('./auth/sign-on/sign-on.component').then((m) => m.SignOnComponent),
  },
  {
    path: 'menu',
    title: 'Main Menu',
    loadComponent: () =>
      import('./menu/main-menu/main-menu.component').then((m) => m.MainMenuComponent),
  },
  {
    path: 'admin',
    title: 'Admin Menu',
    loadComponent: () =>
      import('./menu/admin-menu/admin-menu.component').then((m) => m.AdminMenuComponent),
  },
  {
    path: 'accounts',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'view' },
      {
        path: 'view/:accountId',
        title: 'View Account',
        loadComponent: () =>
          import('./account/account-view/account-view.component').then(
            (m) => m.AccountViewComponent,
          ),
      },
      {
        path: 'view',
        title: 'View Account',
        loadComponent: () =>
          import('./account/account-view/account-view.component').then(
            (m) => m.AccountViewComponent,
          ),
      },
      {
        path: 'update/:accountId',
        title: 'Update Account',
        loadComponent: () =>
          import('./account/account-update/account-update.component').then(
            (m) => m.AccountUpdateComponent,
          ),
      },
      {
        path: 'update',
        title: 'Update Account',
        loadComponent: () =>
          import('./account/account-update/account-update.component').then(
            (m) => m.AccountUpdateComponent,
          ),
      },
    ],
  },
  {
    path: 'cards',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        title: 'List Credit Cards',
        loadComponent: () =>
          import('./card/card-list/card-list.component').then((m) => m.CardListComponent),
      },
      {
        path: 'view/:cardNumber',
        title: 'View Credit Card Detail',
        loadComponent: () =>
          import('./card/card-detail/card-detail.component').then((m) => m.CardDetailComponent),
      },
      {
        path: 'view',
        title: 'View Credit Card Detail',
        loadComponent: () =>
          import('./card/card-detail/card-detail.component').then((m) => m.CardDetailComponent),
      },
      {
        path: 'update/:cardNumber',
        title: 'Update Credit Card Details',
        loadComponent: () =>
          import('./card/card-update/card-update.component').then((m) => m.CardUpdateComponent),
      },
      {
        path: 'update',
        title: 'Update Credit Card Details',
        loadComponent: () =>
          import('./card/card-update/card-update.component').then((m) => m.CardUpdateComponent),
      },
    ],
  },
  {
    path: 'transactions',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        title: 'List Transactions',
        loadComponent: () =>
          import('./transaction/transaction-list/transaction-list.component').then(
            (m) => m.TransactionListComponent,
          ),
      },
      {
        path: 'view/:transactionId',
        title: 'View Transaction',
        loadComponent: () =>
          import('./transaction/transaction-view/transaction-view.component').then(
            (m) => m.TransactionViewComponent,
          ),
      },
      {
        path: 'view',
        title: 'View Transaction',
        loadComponent: () =>
          import('./transaction/transaction-view/transaction-view.component').then(
            (m) => m.TransactionViewComponent,
          ),
      },
      {
        path: 'add',
        title: 'Add Transaction',
        loadComponent: () =>
          import('./transaction/transaction-add/transaction-add.component').then(
            (m) => m.TransactionAddComponent,
          ),
      },
    ],
  },
  {
    path: 'billing/pay',
    title: 'Bill Payment',
    loadComponent: () =>
      import('./billing/bill-pay/bill-pay.component').then((m) => m.BillPayComponent),
  },
  {
    path: 'reports',
    title: 'Transaction Reports',
    loadComponent: () => import('./report/report.component').then((m) => m.ReportComponent),
  },
  {
    path: 'users',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        title: 'List Users',
        loadComponent: () =>
          import('./user/user-list/user-list.component').then((m) => m.UserListComponent),
      },
      {
        path: 'add',
        title: 'Add User',
        loadComponent: () =>
          import('./user/user-add/user-add.component').then((m) => m.UserAddComponent),
      },
      {
        path: ':userId/update',
        title: 'Update User',
        loadComponent: () =>
          import('./user/user-update/user-update.component').then((m) => m.UserUpdateComponent),
      },
      {
        path: 'update',
        title: 'Update User',
        loadComponent: () =>
          import('./user/user-update/user-update.component').then((m) => m.UserUpdateComponent),
      },
      {
        path: ':userId/delete',
        title: 'Delete User',
        loadComponent: () =>
          import('./user/user-delete/user-delete.component').then((m) => m.UserDeleteComponent),
      },
      {
        path: 'delete',
        title: 'Delete User',
        loadComponent: () =>
          import('./user/user-delete/user-delete.component').then((m) => m.UserDeleteComponent),
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
