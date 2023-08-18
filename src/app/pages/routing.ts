import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'quotes',
    loadChildren : () => import('../modules/quotes/quotes.module').then(m => m.QuotesModule),
  },
  {
    path: 'application-sent',
    loadChildren : () => import('../modules/application-to-be-sent/application-to-be-sent.module').then(m => m.SiteMaintenanceModule),
  },
  {
    path: 'site-maintenance',
    loadChildren : () => import('../modules/site-maintenance/site-maintenance.module').then(m => m.SiteMaintenanceModule),
  },
  {
    path: 'reports',
    loadChildren : () => import('../modules/reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: 'quote-amounts',
    loadChildren : () => import('../modules/graphs/quote_amounts.module').then(m => m.QuoteAmountsModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'dashboard-view',
    loadChildren: () =>
      import('./dashboard-view/dashboard-view.module').then((m) => m.DashboardViewModule),
  },


  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
    data: { layout: 'dark-header' },
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    data: { layout: 'light-header' },
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
    data: { layout: 'light-header' },
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: '',
    redirectTo: '/dashboard-view',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
