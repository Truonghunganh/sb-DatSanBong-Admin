import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from './../../../environments/environment';
import { AppCommonService } from './../../app-common/services/app-common.service';
import { Admin, Admin1 } from './../models/auth.model';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private appCommonService: AppCommonService,
        @Inject(LOCAL_STORAGE) private storage: WebStorageService,
        private router: Router
    ) {
//        this.adminSubject = new BehaviorSubject<Admin1>(JSON.parse(this.storage.get('admin')));
    }
  //  private adminSubject: any;
    logout() {
        this.storage.set('tokenAdmin', JSON.stringify(1));
        this.router.navigate(['auth/login']);

    }
    checkTokenAdmin(): Observable<any>{
        return this.http.get<any>('http://localhost:8000/api/v1/checkTokenAdmin', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    login(user : any): Observable<any>{
        return this.http.post<any>('http://localhost:8000/api/v1/loginAdmin', user, this.appCommonService.httpOptions).pipe(
            tap(data=>{
                if(data.status){                    
                    this.setToken(data.token);                    
                }
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }    
    setToken(token:string){
        this.storage.set('tokenAdmin', JSON.stringify(token));
    }
}
