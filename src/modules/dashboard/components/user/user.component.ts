import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import {  Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'


@Component({
    selector: 'sb-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user.component.html',
    styleUrls: ['user.component.scss'],
})
export class UserComponent implements OnInit {
    user: any;
    checkuser = false;
    ListDatSanByIduservaonhungngaytoi: any;
    checklistdansan = false;
    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authService: AuthService
    ) { }
    ngOnInit() {
        this.checkTokenUser();
    }
    checkTokenUser(){
        this.checkuser=false;
        this.authService.checkTokenUser().subscribe(result=>{
            if (result.status) {
                this.user= result.user;
                this.checkuser=true;
                this.getListDatSanByUserToken();
                this.changeDetectorRef.detectChanges();

            } else {
                this.router.navigate(['/auth/login']);
            }
        })
    }
    
    getListDatSanByUserToken() {
        this.checklistdansan = false;
        this.dashboardService.getListDatSanByUserToken().subscribe(result => {
            if (result.status) {
                this.ListDatSanByIduservaonhungngaytoi = result.datsans;
                this.checklistdansan = true;
                this.changeDetectorRef.detectChanges();
            } else {
                this.router.navigate(['/auth/login']);
            }
        })
    }
    editUser(){
        this.router.navigate(['/dashboard/edituser']);
        
    }
}
