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
import { NavbarComponent } from './components/users/navbar/navbar.component';
import { NavbarRoutingModule } from './components/users/navbar/navbar-routing.module';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from './components/users/employees/services/services.module';
import { ProfileContractorModule } from './components/users/contractors/profile-contractor/profile-contractor.module';
import { IndexModule } from './components/users/contractors/index/index.module';

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
    ProfileContractorModule,
    IndexModule
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
