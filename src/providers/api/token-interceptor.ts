import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    public token: string;

    constructor(public storage: Storage) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers: any;

        this.storage.get('token').then((condition) => {
            if(condition){
                this.storage.get('token').then((val) => {
                    headers = new HttpHeaders({
                      'Authorization': `Bearer ${val}`,
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                    });
                });
            }else{

            }
        });
        const cloneReq = request.clone({headers});

        return next.handle(cloneReq);
    }
}
