import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/Services/admin-service.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminModel } from 'src/app/Models/AdminModel';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { TaxRegModel } from 'src/app/Models/TaxRegModel';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  adminid: any;

    AdminModel$: Observable<TaxRegModel>;
  constructor( private AdminService: AdminServiceService, private UserService: UserServiceService, private avRout: ActivatedRoute) {
const paramid = 'id';
if (this.avRout.snapshot.params[paramid]){
this.adminid = this.avRout.snapshot.params[paramid];

   }

  }

  ngOnInit(): void {
  this.getById();
  }

  getById(){
this.AdminModel$ = this.UserService.GetUserById(this.adminid);

  }


}
