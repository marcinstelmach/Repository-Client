import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe(val => {
      this.checkIfLogin();
    });
  }

  ngOnInit() {
    this.checkIfLogin();
  }

  logout() {
    this.authService.removeTokens();
    this.router.navigate(['/login']);
  }

  checkIfLogin(): void {
    this.isLogin = !this.authService.isTokenExpired();
  }

}
