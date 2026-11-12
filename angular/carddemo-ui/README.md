# CarddemoUi

Angular front-end scaffold for the CardDemo modernization lab. It contains one
standalone placeholder component per CICS BMS map in `app/bms/` (read-only reference).

Generated with Angular CLI 22.2.7 (Angular 22.2.x, Node.js 22.23 or newer).

## Screens and routes

| Feature folder | Component | BMS map | Route(s) |
| --- | --- | --- | --- |
| `auth/` | `SignOnComponent` | COSGN00 | `/sign-on` (default) |
| `menu/` | `MainMenuComponent` | COMEN01 | `/menu` |
| `menu/` | `AdminMenuComponent` | COADM01 | `/admin` |
| `account/` | `AccountViewComponent` | COACTVW | `/accounts/view`, `/accounts/view/:accountId` |
| `account/` | `AccountUpdateComponent` | COACTUP | `/accounts/update`, `/accounts/update/:accountId` |
| `card/` | `CardListComponent` | COCRDLI | `/cards/list` |
| `card/` | `CardDetailComponent` | COCRDSL | `/cards/view`, `/cards/view/:cardNumber` |
| `card/` | `CardUpdateComponent` | COCRDUP | `/cards/update`, `/cards/update/:cardNumber` |
| `transaction/` | `TransactionListComponent` | COTRN00 | `/transactions/list` |
| `transaction/` | `TransactionViewComponent` | COTRN01 | `/transactions/view`, `/transactions/view/:transactionId` |
| `transaction/` | `TransactionAddComponent` | COTRN02 | `/transactions/add` |
| `billing/` | `BillPayComponent` | COBIL00 | `/billing/pay` |
| `report/` | `ReportComponent` | CORPT00 | `/reports` |
| `user/` | `UserListComponent` | COUSR00 | `/users/list` |
| `user/` | `UserAddComponent` | COUSR01 | `/users/add` |
| `user/` | `UserUpdateComponent` | COUSR02 | `/users/update`, `/users/:userId/update` |
| `user/` | `UserDeleteComponent` | COUSR03 | `/users/delete`, `/users/:userId/delete` |

`/accounts`, `/cards`, `/transactions` and `/users` redirect to their default screen;
unknown paths render `NotFoundComponent`. Route parameters are bound to component
inputs via `withComponentInputBinding()`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
