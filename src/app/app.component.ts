import { Component } from '@angular/core';
import { LoaderService } from './core/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zeth-admin-test';

  constructor(public loaderService:LoaderService){}
}
