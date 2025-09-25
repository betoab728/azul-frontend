import { Component } from '@angular/core';
//para navigation routerlink
import { RouterLink } from '@angular/router';
import { TranslateModule,TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterLink,TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  constructor(private translate: TranslateService) {
    this.translate.setFallbackLang('es');
    this.translate.use('es');
  }

}
