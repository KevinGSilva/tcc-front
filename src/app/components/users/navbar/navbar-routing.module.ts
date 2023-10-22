import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../employees/profile/profile.component';
import { EmailVerificationGuard } from 'src/app/services/auth/guards/email-verification.guard';
import { NavbarComponent } from './navbar.component';
import { AuthGuard } from 'src/app/services/auth/guards/auth.guard';
import { ServicesComponent } from '../employees/services/services.component';

const routes: Routes = [

  {path: 'employee', component: NavbarComponent, children: [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    {path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ,EmailVerificationGuard]},
    {path: 'services', component: ServicesComponent, canActivate: [ AuthGuard ,EmailVerificationGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
