import { Component,HostListener  } from '@angular/core';
import { TranslateModule,TranslateService   } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [CommonModule,TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  showLangMenu = false;

  constructor(private translate: TranslateService) {
    this.translate.setFallbackLang('es');
    this.translate.use('es');
  }
  toggleLangMenu() {
    this.showLangMenu = !this.showLangMenu;
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.showLangMenu = false; // cerrar menú al seleccionar idioma
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.showLangMenu = false;
    }
  }
}
