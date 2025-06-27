import { Component } from '@angular/core';
//para navigation routerlink
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [ RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

}
