import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/Services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AdminModel } from 'src/app/Models/AdminModel';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { TaxRegModel } from 'src/app/Models/TaxRegModel';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  User: TaxRegModel;
  adminid: number;
  Submitted = false;
  Error = false;
  Loading = false;

  FormData: FormGroup;
  constructor( private route: Router, private UserService: UserServiceService,
               private Service: AdminServiceService, private avRout: ActivatedRoute, private fb: FormBuilder) {
    const paramid = 'id';
    if (this.avRout.snapshot.params[paramid]){this.adminid = this.avRout.snapshot.params[paramid]; }
    this.FormData = this.fb.group({
      Email: ['' , [Validators.compose([ Validators.required, Validators.email])] ],
      FullName: ['', [Validators.compose([Validators.required]) ]],
      Password: ['', [Validators.compose([Validators.required, Validators.minLength(6)])]],
      UserName: ['', [Validators.compose([Validators.required, Validators.minLength(3)])]],
      });


  }

  ngOnInit(): void {
    if (this.adminid !== null){
   this.UserService.GetUserById(this.adminid).subscribe(data =>
  { this.User = data;
    this.FormData.controls.Email.setValue(data[0].Email),
      this.FormData.controls.FullName.setValue(data[0].FullName),
      this.FormData.controls.UserName.setValue(data[0].UserName),
      this.FormData.controls.Password.setValue(data[0].Password); } ); }

  }

   get f(){

     return this.FormData.controls;
   }


  ProcessForm(FormData1){
  this.Submitted = true;
  if (this.FormData.invalid){
  this.Loading = false;
  return false ; }
  this.Loading = true;

  this.UserService.UpdateUser(this.adminid, this.FormData.value).pipe(first()).subscribe(
   data => {this.route.navigate(['Admin/Home']); },
   error => { this.Error = true; });


  }

}
