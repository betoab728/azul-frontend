import { Component, HostListener, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    Sidebar,
    Header,
    Footer,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout implements OnInit {
  sidebarOpen = false;
  isMobile = false;

  
  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // breakpoint md en Tailwind
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
