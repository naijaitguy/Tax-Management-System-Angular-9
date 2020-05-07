import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import { HomeComponent } from './Users/home/home.component';
import { RegisterAdminComponent } from './Admin/register-admin/register-admin.component';
import { LoginAdminComponent } from './Admin/login-admin/login-admin.component';
import { HomeAdminComponent } from './Admin/home-admin/home-admin.component';
import { ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { UserHeaderComponent } from './Users/user-header/user-header.component';
import { UserFooterComponent } from './Users/user-footer/user-footer.component';
import { UserSidebarComponent } from './Users/user-sidebar/user-sidebar.component';
import { UserSliderComponent } from './Users/user-slider/user-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminServiceService } from './Services/admin-service.service';
import { HearderComponent } from './Admin/hearder/hearder.component';
import { FooterComponent } from './Admin/footer/footer.component';
import { ViewUserComponent } from './Admin/view-user/view-user.component';
import { EditUserComponent } from './Admin/edit-user/edit-user.component';
import { DeleteUserComponent } from './Admin/delete-user/delete-user.component';
import { UserServiceService } from './Services/user-service.service';
import { UserProfileComponent } from './Users/user-profile/user-profile.component';
import { ContactComponent } from './Users/contact/contact.component';
import { AboutComponent } from './Users/about/about.component';
import { TaxApplicationComponent } from './Users/tax-application/tax-application.component';
import { CalculateTaxComponent } from './Users/calculate-tax/calculate-tax.component';
import { PaytaxComponent } from './Users/paytax/paytax.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RegisterAdminComponent,
    LoginAdminComponent,
    HomeAdminComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserSidebarComponent,
    UserSliderComponent,
    HearderComponent,
    FooterComponent,
    ViewUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    UserProfileComponent,
    ContactComponent,
    AboutComponent,
    TaxApplicationComponent,
    CalculateTaxComponent,
    PaytaxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [AdminServiceService , UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
