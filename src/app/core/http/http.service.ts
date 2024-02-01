/**
 *
 * Created By Iruobe Akhigbe Ayomide <iruobe.revent@zenithbank.com> @ 01/02/2023
 *
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token: string;
  options: any;
  headersSet: any = {};

  constructor(private http: HttpClient) {
    this.token  = env.TOKEN;
  }

  createAuthorizationHeader() {
    let val = sessionStorage.getItem(this.token);
    if (val) {
      const token: string = JSON.parse(val);
      this.headersSet = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `${token}`
      });
    } else {
      this.headersSet = new HttpHeaders({
        'Content-Type':  'application/json'
      });
    }
  }

  public get(endpoint: string, data:any, parameters?: HttpParams): Observable<any> {
    // console.info('HEADER::', this.headersSet);
    this.createAuthorizationHeader();
    if (parameters) {
      this.options = { params: parameters, headers: this.headersSet };
    } else {
      this.options = { headers: this.headersSet };
    }
    return this.http.get(endpoint, this.options);
  }

  public post(endpoint: string, data: any): Observable<any> {
    this.createAuthorizationHeader();
    return this.http.post(endpoint, data, {  headers: this.headersSet });
  }

  public delete(endpoint: string , data: any): Observable<any> {
    this.createAuthorizationHeader();
    const params = new HttpParams(data);
    return this.http.delete(endpoint, {  headers: this.headersSet, params  });

  }

  public put(endpoint: string, data: any): Observable<any> {
    this.createAuthorizationHeader();
    return this.http.put(endpoint, data, {  headers: this.headersSet });
  }

  public patch(endpoint: string, data: any): Observable<any> {
    this.createAuthorizationHeader();
    return this.http.patch(endpoint, data, {  headers: this.headersSet });
  }

}
