import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Admin } from '../../models/dashboard.model';

import { AuthService } from '../../../auth/services/auth.service'


@Component({
    selector: 'sb-edit-admmin',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-admmin.component.html',
    styleUrls: ['edit-admmin.component.scss'],
})
export class EditAdmminComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authService: AuthService

    ) {
    }
    checkadmin = false;
    admin: any;
    ngOnInit() {
        this.checkadmin = false;
        this.authService.checkTokenAdmin().subscribe(data => {
            console.log(data);
            if (data.status) {
                this.admin = data.admin;
                this.checkadmin = true;
                this.changeDetectorRef.detectChanges();
            }
            else{
                this.router.navigate(['/auth/login'])
            }
        })
    }
    Cancel(){
        this.router.navigate(['/dashboard/admin'])

    }
    Edit(name: string, gmail: string, address: string, password: string) {
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                const admin = new Admin(name, gmail, address, password);
                this.dashboardService.editAdminByToken(admin).subscribe(
                    data => {
                        if (data.status) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.router.navigate(['/dashboard/admin'])
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: data.message,
                            })

                        }

                    })
            }
        })
    }
}
