import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/observable/throw';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import { environment as env } from '../../../environments/environment';
// import {retryWhen} from "rxjs-compat/operator/retryWhen";
import { retryWhen, delay, mergeMap, take, catchError, map, finalize } from 'rxjs/operators';
import {Router} from '@angular/router';
import { BootstrapNotifyService } from '../bootstrapNotify/bootstrap-notify.service';
import { LoaderService } from '../loader/loader.service';

// /${env.API_VERSION}

@Injectable({
  providedIn: 'root',
})
export class ApiService extends HttpService {
  constructor(http: HttpClient, private router: Router, private bootstrapNotifyService: BootstrapNotifyService, public loaderService: LoaderService) {
    super(http);
  }

  // intercept and format all possible http error.
  private errorHandler(error: any) {
    try {
      console.log('error', error);
      if ((error.error.code === '1008') && (error.error.description.includes('Invalid token or token expired'))) {
        // console.log('logout');
        // sessionStorage.clear();
        // localStorage.clear();
        this.bootstrapNotifyService.error(error.error.description, error.error.code);
        // this.router.navigateByUrl("/");
        // this.utilService.initPassword();
        // return;
       return throwError(error || { description: 'Invalid token or token expired' });
      }
      return throwError(error || { description: 'Invalid token or token expired' });
    } catch (error) {
      return throwError(error || { description: 'Invalid token or token expired' });
    }
  }
  // in case of Login: this will art as an interceptor to store the token return and possible login user data
  private decode(res: any, auth?: string | null) {
    const data = res;
    if (res) {
      // console.log('API_res', res, auth);
      if (auth && auth.match('login')) {
        sessionStorage.setItem(env.TOKEN, JSON.stringify(data.accessToken));
        // console.log('MyToken', data.accessToken);
        sessionStorage.setItem(env.USERTOKEN, JSON.stringify(data));
        // const dateAtTheMoment = Date.now() + 2000; // 2 seconds
        const dateAtTheMoment = (new Date()).getTimezoneOffset() * 60000;

        const newLogOutTime = (new Date()).getTimezoneOffset() * 75000;

        sessionStorage.setItem(env.TOKENEXPIRYCOUNT, JSON.stringify(data.tokenTime));

        sessionStorage.setItem(env.DATE_NOW, (new Date(Date.now() - dateAtTheMoment)).toISOString().slice(0, -1));

        sessionStorage.setItem(env.LOGOUTTIME, (new Date(Date.now() - newLogOutTime)).toISOString().slice(0, -1));
        // sessionStorage.setItem(env.DATE_NOW, JSON.stringify(Date.now()));
      }
      return res;
    } else {
      return res;
    }
  }
  // handles all delete api request
  public deleteRequest(api: string, path: string, data?: any): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;
    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super
      .delete(ENDPOINT, data)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => {
          return res;
        })
      );
  }
  // handles all update api request
  public putRequest(api: string, path: string, data: any): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;
    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super
      .put(ENDPOINT, data)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => {
          return res;
        })
      );
  }
  // handles all patching api request
  public patchRequest(api: string, path: string | null, data: any): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;
    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super
      .patch(ENDPOINT, data)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => {
          return res;
        })
      );
  }
  // handles all get / list api request
  public getRequest(api: string, path?: string | null, params?: HttpParams): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;

    if (path) {
      ENDPOINT = `${env.API_URL}/${api}/${path}`;
    }
    return super.get(ENDPOINT, params).pipe(retryWhen((errors) => {
          // console.log('getRequest1', errors);
          return errors.pipe(mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      ).pipe(catchError(this.errorHandler), map((res) => {
          // console.log('getRequest2', res);
          return res;
        })
      );
  }

  public postRequest(api: string, path: null | string, data: any): Observable<any> {
    let ENDPOINT = `${env.API_URL}/${api}`;

    if (path && path !== 'login') {
      ENDPOINT = env.API_URL + '/' + api + '/' + path;
    } else {
      ENDPOINT = env.API_URL + '/' + api;
    }

    return super
      .post(ENDPOINT, data)
      .pipe(
        retryWhen((errors) => {
          return errors.pipe(
            mergeMap((err) => this.errorHandler(err)),
            delay(1000),
            take(2)
          );
        })
      )
      .pipe(
        catchError(this.errorHandler),
        map((res) => this.decode(res, path))
      );
  }

    //Loader Interceptor
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    )
  }



}
