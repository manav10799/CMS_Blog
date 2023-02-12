import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;  

  constructor(private router: Router,
    private socialAuthService: SocialAuthService) {

  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      localStorage.setItem('userObject', JSON.stringify(user));
      this.user = user;
      this.loggedIn = (user != null);
      this.router.navigate(['dashboard']);
  });
  }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  // signInWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
  // }
  
}
