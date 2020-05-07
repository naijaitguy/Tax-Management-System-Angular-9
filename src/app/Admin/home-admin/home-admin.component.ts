import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/Services/admin-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminModel } from 'src/app/Models/AdminModel';
import { TaxRegModel } from 'src/app/Models/TaxRegModel';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

 public UserModel$: Observable<Array<TaxRegModel>>;

  constructor( private service: AdminServiceService, private Userservice: UserServiceService) { }

  ngOnInit(): void {
   this.LoadAllAUser();
  }

LoadAllAUser(){

  this.UserModel$ = this.Userservice.GetAllUser();

}

DeleteUser(UserId){
  const Answer = confirm('Are You Sure You Want To Delete the User ? ');
  if (Answer){

  this.Userservice.DeleteUser(UserId).subscribe(data =>
    {
   this.LoadAllAUser();
  }, error => { alert('Could not Delete User'); });

 }


   }

}
