import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service'
@Component({
    selector: 'sb-dashboard-listquans',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-listquans.component.html',
    styleUrls: ['dashboard-listquans.component.scss'],
})
export class DashboardListquansComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private changeDetectorRef: ChangeDetectorRef

        ) {}
    listquans$: any;
    checkquan=false;
    url = environment.url;
    urlCLU= environment.urlCLU;
     ngOnInit() {
        this.checktoken();
        
    }

    checktoken(){
        this.authService.checkTokenUser().subscribe(data=>{
            if (!data.status) {
                this.router.navigate(['/auth/login']);
            }else{
                this.getListquans();
                this.changeDetectorRef.detectChanges();
            }
        })
    }
    getListquans() {
        this.checkquan= false;
        this.listquans$=this.dashboardService.getListQuans().pipe(map((result=>result.quan)))
        this.dashboardService.getListQuans().subscribe(data=>{
            console.log(data);
            
        });
    }
}
