import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
})
export class TopNavComponent implements OnInit {
  
  user: SocialUser = new SocialUser;
  constructor(private authService: SocialAuthService,private router: Router) {

  }
  ngOnInit():void {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    this.authService.signOut();
    this.router.navigate(['login']);
  }
}
