import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isMobileView: boolean = false;

  ngOnInit() {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 768; // ปรับขนาดตามความเหมาะสม
    this.isSidebarOpen = !this.isMobileView;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateAndCloseSidebar() {
    if (this.isMobileView) {
      this.isSidebarOpen = false;
    }
  }
}
