import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndividualPostComponent } from './dashboard/individual-post/individual-post.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuardService } from './services/authgaurd.service';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard/:id', component: IndividualPostComponent, canActivate: [AuthGuardService]},
  { path: 'posts', component: PostsComponent,canActivate: [AuthGuardService] },
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
