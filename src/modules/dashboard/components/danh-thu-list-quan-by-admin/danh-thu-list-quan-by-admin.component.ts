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
    checkdoanhthu = false;
    doanhthus: any;
    tongdoanhthuquan=0;
    tongdoanhthuadmin=0;
    laixuat=""; 

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
                this.getDoanhThuListQuanByAdmin();
            }
        })
    }
    tinhtong(mang: any){
        let tong=0;
        for (let i = 0; i < mang.length; i++) {
            tong+=mang[i];
        }
        return tong;
    }
    getDoanhThuListQuanByAdmin() {
        this.checkdoanhthu = false;
        this.dashboardService.getDoanhThuListQuanByAdmin(this.month).subscribe(data => {
            console.log(data);

            if (data.status) {
                this.doanhthus = data.doanhthus;
                this.tongdoanhthuquan=0;
                this.tongdoanhthuadmin=0;
                for (let i = 0; i < this.doanhthus.length; i++) {
                    this.tongdoanhthuquan+=this.doanhthus[i].doanhthuquan;
                    this.tongdoanhthuadmin+=this.doanhthus[i].doanhthuadmin;
                }
                this.laixuat=data.laixuat;
                console.log(this.tongdoanhthuquan,this.tongdoanhthuadmin);
                
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
        this.getDoanhThuListQuanByAdmin();

    }
    break() {
        this.router.navigate(['dashboard/quans']);
    }
}
