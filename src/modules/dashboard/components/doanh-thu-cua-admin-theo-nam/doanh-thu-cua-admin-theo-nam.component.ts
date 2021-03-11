import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from "../../services/dashboard.service";
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
import { Chart, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
    selector: 'sb-doanh-thu-cua-admin-theo-nam',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './doanh-thu-cua-admin-theo-nam.component.html',
    styleUrls: ['doanh-thu-cua-admin-theo-nam.component.scss'],
})
export class DoanhThuCuaAdminTheoNamComponent implements OnInit {
    nam = Number(new Date().toISOString().slice(0, 4));
    lineChartOptions = {
        responsive: true,
    };
    lineChartColors: Color[] = [
        {
            backgroundColor: [
                'rgba(255,0,0,0.3)', //đỏ
                'rgba(0,255,0,0.3)',//xanh lá cây
                'rgba(0,0,255,0.3)',//blue
                'rgba(192,192,192,0.3)',//grey
                'rgba(255,255,0,0.3)',//yellow
                'rgba(255,0,255,0.3)',// Cerise
                'rgba(255,0,0,0.3)', //đỏ
                'rgba(0,255,0,0.3)',//xanh lá cây
                'rgba(0,0,255,0.3)',//blue
                'rgba(192,192,192,0.3)',//grey
                'rgba(255,255,0,0.3)',//yellow
                'rgba(255,0,255,0.3)',// Cerise
            ]
        },

    ];
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    doanhthustheonam = [];
    lineChartTypeOB = 'bar';//'pie';//'line';
    lineChartDataOB: ChartDataSets[] = [];
    lineChartLabelsOB = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    checkdoanhthustheonam = false;
    constructor(
        private dashboardService: DashboardService,
        private router: Router,
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
    ) { }
    ngOnInit() {
        this.checkTokenAdmin();
    }
    checkTokenAdmin() {
        this.authService.checkTokenAdmin().subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/auth/login'])

            } else {
                this.getDoanhThuCuaAdminTheoNam(this.nam);

            }
        })
    }
    tinhtongDoanhthucuuanam(mang: any) {
        let tong = 0;
        for (let i = 0; i < mang.length; i++) {
            tong += mang[i];
        }
        return tong;
    }
    tongDanhthucuuanam = 0;
    getDoanhThuCuaAdminTheoNam( nam: number) {
        this.checkdoanhthustheonam = false;
        this.dashboardService.getDoanhThuCuaAdminTheoNam(nam).subscribe(
            data => {
                if (data.status) {
                    this.doanhthustheonam = data.doanhthustheonam;
                    this.lineChartDataOB = [{ data: data.doanhthustheonam }];
                    this.tongDanhthucuuanam = this.tinhtongDoanhthucuuanam(this.doanhthustheonam);
                    this.checkdoanhthustheonam = true;
                    this.changeDetectorRef.detectChanges();
                }

            }
        )
    }

    //'bar';//'pie';//'line';
    dangBD = "Biểu đồ cột";
    cot() {
        this.dangBD = "Biểu đồ cột";
        this.lineChartTypeOB = "bar"
    }
    tron() {
        this.dangBD = "Biểu đồ hình tròn";
        this.lineChartTypeOB = "pie";
    }
    duong() {
        this.dangBD = "Biểu đồ đường";
        this.lineChartTypeOB = "line";
    }

}
