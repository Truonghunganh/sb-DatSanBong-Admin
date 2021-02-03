import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { environment } from 'environments/environment';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AppCommonService {
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}
    public httpOptions = {
        headers: new HttpHeaders({
            'tokenUser': JSON.parse(this.storage.get('tokenUser')),
            //Authorization: `Bearer ${JSON.parse(this.storage.get('admin')).token}`,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',

        }),
    };
    public httpOption(){
        if(this.storage.get('admin').token){
            console.log(1);
            
        }
        else{
            console.log(2);
            
        }
    }
    public httpOptions1 = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'token': `${environment.token}`,
           // 'Authorization': 'Bearer ' + environment.token
        }),
    };

    getAppCommon$(): Observable<{}> {
        return of({});
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Serve error');
    }
}
