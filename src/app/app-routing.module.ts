import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegisterComponent } from './system/register/register.component';
import { EmailVerificationGuard } from './services/auth/email-verification.guard';
import { EmailValidationComponent } from './auth/email-validation/email-validation/email-validation.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'home', component: HomeComponent, },
  { path:'auth/login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'verify-email', component: EmailValidationComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
