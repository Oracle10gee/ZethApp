import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallService } from 'src/app/core/api-handlers/call/call.service';
import { BootstrapNotifyService } from 'src/app/core/bootstrapNotify/bootstrap-notify.service';
import { CacheService } from 'src/app/core/cache/cache.service';
import { IResponse } from './../../../../shared/models/iresponse';
import { environment as ENV } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../../assets/css/angularMaterial.css']
})
export class LoginComponent implements OnInit {
  public credentials = {
    email: null,
    password: null
  };
  hide = true;

  constructor(
    private router: Router, private bootstrapService: BootstrapNotifyService, private callService: CallService, private cacheService: CacheService) { }
    public loading: boolean = false;

  ngOnInit(): void {
    this.cacheService.clearSession();
    this.cacheService.clearStorage();
  }

  getJsonValue() {
    this.loading = true;
    this.router.navigate(['/main/dashboard/overview']);
    if (!this.credentials.email) {
      return this.bootstrapService.error('Email is a Required Field!!');
    } else if (!this.credentials.password) {
      return this.bootstrapService.error('Password is a Required Field!!');
    } else {
      this.loading = true;
      console.log(this.credentials);
      // setTimeout(() => {
      //   this.loading = false;
      // }, 3000);
      this.callService.auth(this.credentials).subscribe((res: any) => {
        this.loading = false;
        console.log(res);
        // if (res.accessToken && res.tokenTime) {
        if (res) { //change
          // console.log(res.accessToken);
          this.cacheService.setSession(ENV.TOKEN, res.token); //change
          // this.cacheService.setSession(ENV.TOKEN, res.accessToken);
          this.cacheService.setSession(ENV.USERINFO, res);
          this.cacheService.setSession(ENV.USERID, this.credentials.email);
          // this.bootstrapService.success(res.status + ', Authentication successful!' || 'Authentication successful!');
          this.bootstrapService.success('<br>' + ' Authentication successful! ' || 'Authentication Successful!');
          this.router.navigate(['/main/dashboard/overview']);
          console.log('Go to dashboard now')
        } else if (res.code === 400) {
          this.loading = false;
          console.log(res);
          this.bootstrapService.error('<br>' + ' Authentication Failed! ' || 'Authentication Failed!');
        }
      }, (error: any) => {
        this.loading = false;
        console.log('errorrrs', error);
        // this.bootstrapService.error(error.error.error); // change
        // this.bootstrapService.error(error.error.description);
      })
    }
  }

}
