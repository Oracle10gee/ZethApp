import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/core/cache/cache.service';
import { environment as ENV } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private cacheService: CacheService, private router: Router  ) {
    const token = this.cacheService.getSession(ENV.TOKEN);
    if(!token || token === '' ) {
      // console.log('token is not here');
      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit(): void {
  }

}
