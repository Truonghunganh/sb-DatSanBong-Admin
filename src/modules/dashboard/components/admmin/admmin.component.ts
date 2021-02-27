import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { map } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';



@Component({
    selector: 'sb-admmin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './admmin.component.html',
    styleUrls: ['admmin.component.scss'],
})
export class AdmminComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef

    ) { }
    ngOnInit() {
        this.checktoken();
    }
    url = environment.url;
    checkadmin=false;
    admin:any;
    listquanschuapheduyet: any;
    checklistquanschuapheduyet = false;
    checktoken() {
        this.checkadmin= false;
        this.authService.checkTokenAdmin().subscribe(data => {
            if (!data.status) {
                this.router.navigate(['/auth/login']);
            } else {
                this.checkadmin=true;
                this.admin=data.admin;
                this.changeDetectorRef.detectChanges();   
                this.getListquans();
            }
        })
    }
    getListquans() {
        this.checklistquanschuapheduyet = false;
        this.dashboardService.getListQuansChuaPheDuyetByTokenAdmin().subscribe(data => {
            console.log(data);

            if (data.status) {
                this.listquanschuapheduyet = data.quans;
                this.checklistquanschuapheduyet = true;
                this.changeDetectorRef.detectChanges();

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            }
        })
    }
    thaydoitrangthai(quan: any) {
        Swal.fire({
            html: '<h1 style="color: #41c04d;">bạn có muốn cho quán này ngừng hoạt động hay không ?</h1><table style="width: 100%;" border="1"><tr><td>id quán </td><td>' + quan.id + '</td></tr><tr><td>tên quán </td><td>' + quan.name + '</td></tr><tr><td>Phone quán</td><td>' + quan.phone + '</td></tr><tr><td>địa chỉ quán</td><td>' + quan.address + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `ok`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.UpdateTrangThaiQuanTokenAdmin(quan.id,true).subscribe(data => {
                    console.log(data);
                    if (data.status) {
                        this.getListquans();

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })
                    }
                })
            }
        });

    }
    editAdmin(){
        this.router.navigate(['/dashboard/editadmin'])
    }
    deleteQuan(quan: any) {
        Swal.fire({
            html: '<h1 style="color: #41c04d;">Bạn có muốn xóa Quán này không ?</h1><table style="width: 100%;" border="1"><tr ><td style="text-align: center;" colspan="2"><div><img style="width: 100px; " src="' + this.url + '/' + quan.image + '"></div></td></tr><tr><td>tên quán </td><td>' + quan.name + '</td></tr><tr><td>Phone </td><td>' + quan.phone + '</td></tr><tr><td>Address </td><td>' + quan.address + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `Delete`,
        }).then(result => {
            if (result.value) {
                this.dashboardService.deleteQuanByAdmin(quan.id).subscribe(
                    data => {
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'delete quán thành công',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.getListquans();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: data.message,
                            })

                        }

                    }
                )

            } else {

            }
        });


    }

}
