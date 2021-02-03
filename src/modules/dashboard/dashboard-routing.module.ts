import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

import { environment } from './../../environments/environment';

/* Routes */
export const ROUTES: Routes = [
    // {
    //     path: '',
    //     canActivate: [],
    //     component: dashboardContainers.DashboardComponent,
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/quan',
        //redirectTo: 'quan/:iduser',
    },

    {
        path: 'quan',
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
    },
    {
        path: 'san/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardListsanComponent,
    },
    {
        path: 'user',
        canActivate: [],
        component: dashboardContainers.DashboardUserComponent,
    },
    {
        path: 'edituser',
        canActivate: [],
        component: dashboardContainers.DashboardUserEditComponent,
    },

  
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {};
