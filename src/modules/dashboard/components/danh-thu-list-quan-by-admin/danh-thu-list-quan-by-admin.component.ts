import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from "../../services/dashboard.service";
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';

@Component({
    selector: 'sb-danh-thu-list-quan-by-admin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './danh-thu-list-quan-by-admin.component.html',
    styleUrls: ['danh-thu-list-quan-by-admin.component.scss'],
})
export class DanhThuListQuanByAdminComponent implements OnInit {
    month = new Date().toISOString().slice(0, 7);
    checkdanhthu = false;
    danhthus: any;
    constructor(
        private dashboardService: DashboardService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }
    ngOnInit() {
        this.checkToken();
    }
    checkToken() {
        this.authService.checkTokenAdmin().subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/dashboard/quans'])

            } else {
                this.getDanhThuListQuanByAdmin();
            }
        })
    }
    getDanhThuListQuanByAdmin() {
        this.checkdanhthu = false;
        this.dashboardService.getDanhThuListQuanByAdmin(this.month).subscribe(data => {
            console.log(data);

            if (data.status) {
                this.danhthus = data.danhthus;
                this.checkdanhthu = true;
                this.changeDetectorRef.detectChanges();

            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }
        })
    }
    chonthang(thang: any) {
        this.month = thang.target.value
        this.getDanhThuListQuanByAdmin();

    }
    break() {
        this.router.navigate(['dashboard/quans']);
    }
}
