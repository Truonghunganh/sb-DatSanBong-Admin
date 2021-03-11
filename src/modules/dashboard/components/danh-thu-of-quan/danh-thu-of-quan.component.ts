import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from "../../services/dashboard.service";
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';

@Component({
    selector: 'sb-danh-thu-of-quan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './danh-thu-of-quan.component.html',
    styleUrls: ['danh-thu-of-quan.component.scss'],
})
export class DanhThuOfQuanComponent implements OnInit {
    month = new Date().toISOString().slice(0, 7);
    idquan = 0;
    checkdoanhthu = false;
    doanhthus: any;
    constructor(
        private dashboardService: DashboardService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        console.log(this.idquan);
        this.checkToken();
    }
    checkToken() {
        this.authService.checkTokenAdmin().subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/dashboard/quans'])

            } else {
                this.getDoanhThuByAdmin();
            }
        })
    }
    tongdoanhthu=0;
    getDoanhThuByAdmin() {
        this.checkdoanhthu = false;
        this.dashboardService.getDoanhThuByAdmin(this.idquan, this.month).subscribe(data => {
            console.log(data);

            if (data.status) {
                this.doanhthus = data.doanhthus;
                this.tongdoanhthu=0;
                for (let i = 0; i < this.doanhthus.length; i++) {
                    this.tongdoanhthu+=this.doanhthus[i].doanhthu;
                }
                this.checkdoanhthu = true;
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
        this.getDoanhThuByAdmin();

    }
    break() {
        this.router.navigate(['dashboard/quans/' + this.idquan])
    }
}
