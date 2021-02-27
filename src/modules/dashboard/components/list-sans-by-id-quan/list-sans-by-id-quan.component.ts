import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Datsan } from '../../models/dashboard.model'
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'sb-list-sans-by-id-quan',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list-sans-by-id-quan.component.html',
    styleUrls: ['list-sans-by-id-quan.component.scss'],
})
export class ListSansByIdQuanComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
    ) { }
    idquan = 1;
    checklistsans=false;
    listsans: any;
    quan:any;
    checkquan=false;
    url = environment.url;
    mangDatsan = new Array();
    today = new Date().toISOString().slice(0, 10);
    ngayvagio: string = "";
    checkdatsan = false;
    ngOnInit() {
        this.idquan = Number(this.activatedRoute.snapshot.paramMap.get('idquan'));
        console.log(this.idquan);
        
        this.checkTokenAdmin();
    }
    checkTokenAdmin() {
        this.authService.checkTokenAdmin().subscribe(data => {
            console.log(data);

            if (!data.status) {
                this.router.navigate(['/dashboard/quans'])
            } else {
                this.getQuanByid(this.idquan);
                this.ngayvagio = new Date().toISOString().slice(0, 10);
                this.getSanByidquan(this.idquan, this.ngayvagio);
            }
        })
    }
    chonngay(ngay: any) {
        this.ngayvagio = ngay.target.value;
        console.log(ngay.target.value);
        this.getSanByidquan(this.idquan, ngay.target.value);

    }


    mangdatsancuamotsan(san: any) {
        let array = new Array(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);
        for (let i = 0; i < san.length; i++) {
            switch (san[i].start_time.slice(11, 13)) {
                case "05": array[0] = true; break;
                case "06": array[1] = true; break;
                case "07": array[2] = true; break;
                case "08": array[3] = true; break;
                case "09": array[4] = true; break;
                case "10": array[5] = true; break;
                case "11": array[6] = true; break;
                case "12": array[7] = true; break;
                case "13": array[8] = true; break;
                case "14": array[9] = true; break;
                case "15": array[10] = true; break;
                case "16": array[11] = true; break;
                case "17": array[12] = true; break;
                case "18": array[13] = true; break;
                case "19": array[14] = true; break;
                case "20": array[15] = true; break;

                default:
                    break;
            }
        }
        return array;
    }

    getSanByidquan(idquan: number, ngay: any) {

        this.checkdatsan = false;
        this.checklistsans=false;
        this.dashboardService.getsanByidquan(idquan, ngay).subscribe(result => {
            if (result.status) {
                const arrMang = new Array();
                for (let i = 0; i < result.datsans.length; i++) {
                    arrMang[i] = this.mangdatsancuamotsan(result.datsans[i]);
                }
                this.mangDatsan = arrMang;
                this.listsans = result.san;
                this.checkdatsan = true;
                this.checklistsans =true;
                this.changeDetectorRef.detectChanges();
            }

        })
    }

    getQuanByid(id: number) {
        this.checkquan=false;
        this.dashboardService.getQuanById(id).subscribe(data=>{
            console.log(data);
            if (data.status) {
                this.quan=data.quan;
                this.checkquan=true;
                this.changeDetectorRef.detectChanges();

            }
            
        })
    }
    addSan() {
        this.router.navigate(['/dashboard/addSan/' + this.idquan]);
    }
    xemdanhthu() {
        this.router.navigate(['dashboard/danhthu/' + this.idquan]);
    }

}


