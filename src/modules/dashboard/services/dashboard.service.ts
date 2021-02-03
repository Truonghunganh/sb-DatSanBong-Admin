import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppCommonService } from '@common/services';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Datsan,User } from '../models/dashboard.model'; 
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
    getListQuans(): Observable<any>{
        
        return this.http
            .get<any>(environment.url + "/api/v1/quan")
            .pipe(
                tap(data => {
                    of(data);
                },
                    catchError(this.appCommonService.errorHandler)
                ));
    }
    getQuanById(id: number): Observable<any>{
        return this.http.get<any>(environment.url + "/api/v1/quan/" + id)
                .pipe(tap(data => of(data)), catchError(this.appCommonService.errorHandler));
    }
    getsanByidquan(idquan:number,ngay:any): Observable<any>{
        return this.http.get<any>(environment.url + "/api/v1/san?idquan=" + idquan + "&start_time="+ngay)
            .pipe(
                tap(data => {
                    of(data);
                },
                    catchError(this.appCommonService.errorHandler)
                ));
    }
    
    addDatSan(datsan: Datsan): Observable<any> {
        console.log(datsan);
        return this.http
            .post<any>(environment.url + "/api/v1/datsans", datsan, this.appCommonService.httpOptions)
            .pipe(
                tap(data => of(data)),
                catchError(this.appCommonService.errorHandler)
            );
    }
    getListDatSanByUserToken(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListDatSanByUserToken",this.appCommonService.httpOptions).pipe(
            tap(data => of(data)),catchError(this.appCommonService.errorHandler)
        );
    }
    editUserByToken(user: User): Observable<any>{
        return this.http.put<any>(environment.url + "/api/v1/editUserByToken",user,this.appCommonService.httpOptions).pipe(
            tap(data => { 
                console.log(data);
                if (data.status) {
                    this.authService.setToken(data.token);                    
                }
                
                of(data)} )
            ,catchError(this.appCommonService.errorHandler)
        )
    }
}
