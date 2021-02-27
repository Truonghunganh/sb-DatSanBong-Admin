import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Datsan,Admin } from '../models/dashboard.model'; 
import { AuthService  } from '../../auth/services/auth.service'

@Injectable()
export class DashboardService {
    constructor(
        private http: HttpClient, 
        private appCommonService: AppCommonService,
        private authService: AuthService
        ) {}

    getDashboard$(): Observable<{}> {
        return of({});
    }
    getListDatSanByUserToken(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListDatSanByUserToken",this.appCommonService.httpOptions).pipe(
            tap(data => of(data)),catchError(this.appCommonService.errorHandler)
        );
    }
    getListQuansDaPheDuyetByTokenAdmin(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansDaPheDuyetByTokenAdmin", this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    getListQuansChuaPheDuyetByTokenAdmin(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansChuaPheDuyetByTokenAdmin", this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    UpdateTrangThaiQuanTokenAdmin(idquan:number,trangthai:boolean): Observable<any> {
        return this.http.put<any>(environment.url + "/api/v1/UpdateTrangThaiQuanTokenAdmin",{"idquan":idquan,"trangthai":trangthai}, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }

    deleteQuanByAdmin(id: number): Observable<any> {
        return this.http.delete<any>(environment.url + "/api/v1/quan/"+id, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }
    editAdminByToken(admin: Admin): Observable<any>{
        return this.http.put<any>(environment.url + "/api/v1/editAdminByToken",admin, this.appCommonService.httpOptions).pipe(
            tap(data => {
                if (data.status) {
                    this.authService.setToken(data.token);
                }
                of(data)
            } ), catchError(this.appCommonService.errorHandler)
        );
    }
    getsanByidquan(idquan: number, ngay: any): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/san?idquan=" + idquan + "&start_time=" + ngay)
            .pipe(
                tap(data => {
                    of(data);
                },
                    catchError(this.appCommonService.errorHandler)
                ));
    }


    getQuanById(id: number): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/quan/" + id, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

    getDanhThuByAdmin(idquan: number, month: any): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDanhThuByAdmin", { "idquan": idquan, "time": month }, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

    getDanhThuListQuanByAdmin(month: any): Observable<any> {
        return this.http.post<any>(environment.url + "/api/v1/getDanhThuListQuanByAdmin", { "time": month }, this.appCommonService.httpOptions)
            .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }

}
