import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {  throwError } from 'rxjs';

@Injectable()
export class AppCommonService {
        constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
        
    }
    getToken(){
        if (this.storage.get('tokenAdmin')) {
            return this.storage.get('tokenAdmin');
        }
        else {
            return "1";

        }
    }
    public httpOptions = {
        headers: new HttpHeaders({
            'tokenAdmin': JSON.parse(this.getToken())
        }),
    };
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Serve error');
    }
}
