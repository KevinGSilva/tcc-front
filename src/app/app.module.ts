import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/public/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterModule } from './components/auth/register/register.module';
import { provideNgxMask } from 'ngx-mask';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ProfileModule } from './components/users/employees/profile/profile.module';
import { NavbarComponent } from './components/users/employees/navbar/navbar.component';
import { NavbarRoutingModule } from './components/users/employees/navbar/navbar-routing.module';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from './components/users/employees/services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    RegisterModule,
    LoadingBarModule,
    NavbarRoutingModule,
    FormsModule,
    ProfileModule,
    ServicesModule,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
