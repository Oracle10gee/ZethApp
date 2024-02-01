import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private cacheService: CacheService) {}

  public checkLogin(): boolean {

    const token =  this.cacheService.getSession(ENV.TOKEN);
    // const role =  this.cacheService.getSession(ENV.ROLE);
    if (!token && token === ' ') {
      return true;
    } else {
      return true;
    }
  }


}
