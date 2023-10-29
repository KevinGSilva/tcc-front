import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../employees/profile/profile.component';
import { EmailVerificationGuard } from 'src/app/services/auth/guards/email-verification.guard';
import { NavbarComponent } from './navbar.component';
import { AuthGuard } from 'src/app/services/auth/guards/auth.guard';
import { ServicesComponent } from '../employees/services/services.component';
import { ProfileContractorComponent } from '../contractors/profile-contractor/profile-contractor.component';
import { EmployeeGuard } from 'src/app/services/auth/guards/employee.guard';
import { ContractorGuard } from 'src/app/services/auth/guards/contractor.guard';
import { IndexComponent } from '../contractors/index/index.component';

const routes: Routes = [

  {path: 'employee', component: NavbarComponent, children: [
    {path: '', redirectTo: 'profile', pathMatch: 'full'},
    {path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ,EmailVerificationGuard]},
    {path: 'services', component: ServicesComponent, canActivate: [ AuthGuard ,EmailVerificationGuard]},
  ], canActivate: [EmployeeGuard]},
  {path: 'contractor', component: NavbarComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent, canActivate: [ AuthGuard ,EmailVerificationGuard]},
    {path: 'profile', component: ProfileContractorComponent, canActivate: [ AuthGuard ,EmailVerificationGuard]},
  ], canActivate: [ContractorGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
