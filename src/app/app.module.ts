import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SharedComponent } from './shared/shared.component';
import { LeftNavComponent } from './shared/left-nav/left-nav.component';
import { PostsService } from './services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './shared/login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AuthGuardService } from './services/authgaurd.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    SharedComponent,
    LeftNavComponent,
    DashboardComponent,
    TopNavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    ProgressbarModule.forRoot(),
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
    RatingModule.forRoot(),
    CarouselModule.forRoot(),
    
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '871615173574-l417jqtgmalbbk928vf4isu961h825km.apps.googleusercontent.com'
          )
        },
      ],
      onError: (err: any) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig
  },
    AuthGuardService,
    PostsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
