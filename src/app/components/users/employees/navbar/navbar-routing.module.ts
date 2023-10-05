import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { EmailVerificationGuard } from 'src/app/services/auth/guards/email-verification.guard';
import { NavbarComponent } from './navbar.component';
import { AuthGuard } from 'src/app/services/auth/guards/auth.guard';

const routes: Routes = [

  {path: 'employee', component: NavbarComponent, children: [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    {path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ,EmailVerificationGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
