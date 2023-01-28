import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private socialAuthService: SocialAuthService) {

  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(user => {
      if(user) {
        this.router.navigate(['dashboard']);
      }
    });
  }

}
