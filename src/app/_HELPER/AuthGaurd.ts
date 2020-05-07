import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdminServiceService } from '../Services/admin-service.service';



@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{

constructor( private AdminService: AdminServiceService , private Router: Router){}

canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot){

    if (this.AdminService.Isloggin()){
      this.AdminService.ReturnUrl = state.url;
      return true;

    } else{

   this.Router.navigate( ['/Admin'], { queryParams: {ReturnUrl: state.url}});

    }


}




}
