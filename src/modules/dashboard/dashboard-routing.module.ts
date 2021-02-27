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
        redirectTo: '/dashboard/quans',
    },

    {
        path: 'quans',
        canActivate: [],
        component: dashboardContainers.DashboardListQuansByAdminComponent,
    },
    {
        path: 'admin',
        canActivate: [],
        component: dashboardContainers.DashboardAdminComponent,
    },
    {
        path: 'editadmin',
        canActivate: [],
        component: dashboardContainers.DashboardEditAdminComponent,
    },
    {
        path: 'quans/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardListSansByIdQuanComponent,
    },
    {
        path: 'danhthu/:idquan',
        canActivate: [],
        component: dashboardContainers.DashboardDanhThuOfQuanComponent,
    },
    {
        path: 'danhthulistquan',
        canActivate: [],
        component: dashboardContainers.DashboardDanhThuListQuanByAdminComponent,
    },

];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {};
