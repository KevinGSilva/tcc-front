import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/public/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { EmailValidationComponent } from './components/auth/email-validation/email-validation/email-validation.component';
import { NavbarRoutingModule } from './components/users/employees/navbar/navbar-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'home', component: HomeComponent, },
  { path:'auth/login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'verify-email', component: EmailValidationComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NavbarRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
