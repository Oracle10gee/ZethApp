import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService, private cacheService: CacheService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  checkLogin(): boolean {
     if (this.authService.checkLogin()) {
       return true;
     } else {
       this.router.navigate(['/auth/login']); // then ask user to login
       this.logOut();
       //return false;
       return true;
    
     }
  }

  logOut() {
    this.cacheService.clearStorage();
    this.cacheService.clearSession();
  }
}
