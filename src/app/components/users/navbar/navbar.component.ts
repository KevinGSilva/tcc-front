import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authSvc: AuthService, private loaderSvc: LoadingBarService) {}

  userType?: any;

  logout() {
    this.loaderSvc.start()
    this.authSvc.logout()
  }

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
  }

}
