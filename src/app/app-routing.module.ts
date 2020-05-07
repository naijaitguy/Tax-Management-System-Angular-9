import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Users/login/login.component';
import { LoginAdminComponent } from './Admin/login-admin/login-admin.component';
import { HomeAdminComponent } from './Admin/home-admin/home-admin.component';
import { RegisterAdminComponent } from './Admin/register-admin/register-admin.component';
import { RegisterComponent } from './Users/register/register.component';
import { HomeComponent } from './Users/home/home.component';
import { AuthGaurd } from './_HELPER/AuthGaurd';
import { ViewUserComponent } from './Admin/view-user/view-user.component';
import { EditUserComponent } from './Admin/edit-user/edit-user.component';
import { DeleteUserComponent } from './Admin/delete-user/delete-user.component';
import { UserProfileComponent } from './Users/user-profile/user-profile.component';
import { AboutComponent } from './Users/about/about.component';
import { ContactComponent } from './Users/contact/contact.component';
import { TaxApplicationComponent } from './Users/tax-application/tax-application.component';
import { CalculateTaxComponent } from './Users/calculate-tax/calculate-tax.component';
import { PaytaxComponent } from './Users/paytax/paytax.component';
import { UserGaurd } from './_HELPER/UserGaurd';

// 
const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'Admin', component: LoginAdminComponent },
  {path: 'Admin/Login', component: LoginAdminComponent },
  {path: 'Admin/Home', component: HomeAdminComponent , canActivate: [AuthGaurd ]},
  {path: 'User/Home', component: HomeComponent , canActivate: [UserGaurd]},
  {path: 'Admin/Register', component: RegisterAdminComponent },
  {path: 'User/Profile/:id', component: UserProfileComponent , canActivate: [UserGaurd]},
  {path:  'User/About', component: AboutComponent , canActivate: [UserGaurd]},
  {path: 'User/Apply', component: TaxApplicationComponent , canActivate: [UserGaurd]},
  {path: 'User/Calculate', component: CalculateTaxComponent , canActivate: [UserGaurd]},
  {path: 'User/Paytax', component: PaytaxComponent , canActivate: [UserGaurd]},
  {path: 'User/Contact', component: ContactComponent , canActivate: [UserGaurd]},
  {path: 'User/Register', component: RegisterComponent },
  {path: 'Admin/ViewUser/:id', component: ViewUserComponent,  canActivate: [AuthGaurd ]},
  {path: 'Admin/EditUser/:id', component : EditUserComponent , canActivate: [AuthGaurd ]},
  {path: 'Admin/DeleteUser', component: DeleteUserComponent , canActivate: [AuthGaurd ]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
