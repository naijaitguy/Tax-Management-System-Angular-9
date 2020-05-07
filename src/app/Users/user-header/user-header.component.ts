import { Component, OnInit } from '@angular/core';
import { TaxRegModel } from 'src/app/Models/TaxRegModel';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  User: Observable<TaxRegModel>;
  constructor( private UserService: UserServiceService, private route: Router) {
    this.User =   (JSON.parse(localStorage.getItem('CurrentUser')));

  }

  ngOnInit(): void {
  }

LogOut(){
  localStorage.clear();
  this.UserService.LogOutUser();
  this.route.navigate(['/']);
}

}
