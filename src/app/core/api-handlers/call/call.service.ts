import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../api/api.service';
import { IResponse } from 'src/app/shared/models/iresponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private api: ApiService) { }

  // auth(data: any): any {
  //   // return localStorage.getItem('loginResponse')?? ""
  //   return this.api.postRequest('authenticate', '' , data).map((res: IResponse) => {
  //     return res ;
  //   });
  // }
  auth(data: any): any {
    // return localStorage.getItem('loginResponse')?? ""
    return this.api.postRequest('login', '' , data).map((res: IResponse) => {
      return res ;
    });
  }

  logout(): Observable<IResponse> {
    return this.api.postRequest('user', 'logout', null).pipe(
      map((res: any) => {return res;
      })
    );
  }
}
