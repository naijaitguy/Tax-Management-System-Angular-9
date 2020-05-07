import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserServiceService } from '../Services/user-service.service';



@Injectable({providedIn: 'root'})
export class UserGaurd implements CanActivate{

constructor( private UserService: UserServiceService , private Router: Router){}

canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot){

    if (this.UserService.Isloggin()){
      this.UserService.ReturnUrl = state.url;
      return true;

    } else{

   this.Router.navigate( ['/User'], { queryParams: {ReturnUrl: state.url}});

    }


}




}
