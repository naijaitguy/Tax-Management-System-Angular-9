
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { first } from 'rxjs/operators';
import { TaxRegModel } from 'src/app/Models/TaxRegModel';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  FormData: FormGroup;
  Submitted = false;
  Error = false;
  Loading = false;
  EmailError = false;
  PhoneError = false;
  UsernameError = false;
  Success = false;
  User: TaxRegModel;
  UserId;
  Current_UserName: any;
  currentPhone: any;

  unamePattern = '^[a-z0-9_-]{8,15}$';
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private fb: FormBuilder, private Userservice: UserServiceService, private AVRoute: ActivatedRoute) {

    const ParamId = 'id';
    if (this.AVRoute.snapshot.params[ParamId]){ this.UserId = this.AVRoute.snapshot.params[ParamId]; }
    this.FormData = this.fb.group({
  Email: ['', [Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])]],
  UserName: ['', [Validators.compose([Validators.required, Validators.minLength(3)])]],
  FullName: ['', [Validators.compose([Validators.required])]],
  PhoneNo: ['', [Validators.compose([Validators.required])]],
  Address: ['' , [Validators.compose([Validators.required])]],
  Password: ['' , [Validators.compose([Validators.required, Validators.minLength(6)])]],

  });

   }



  ngOnInit(): void {
if (this.UserId !== null){

  this.Userservice.GetUserById(this.UserId).subscribe( data => {
    this.Current_UserName = data[0].UserName;
    this.currentPhone = data[0].PhoneNo;
    this.FormData.controls.Email.setValue(data[0].Email);
    this.FormData.controls.PhoneNo.setValue(data[0].PhoneNo);
    this.FormData.controls.Address.setValue(data[0].Address);
    this.FormData.controls.FullName.setValue(data[0].FullName);
    this.FormData.controls.UserName.setValue(data[0].UserName);
    this.FormData.controls.Password.setValue(data[0].Password);
}
  );

  // this.FormData.controls.Email.setValue(this.User[0].Email);


}

  }

get f() { return this.FormData.controls; }

ConfirmEmail(){

  if (this.f.Password.value !== this.f.Confirm_Password.value){this.EmailError = true; }

}



FindUserName(){

  this.EmailError = false;
  this.PhoneError = false;
  this.UsernameError = false;
  this.Success = false;
  this.Loading = false;
  return this.Userservice.GetUserByUsername(this.f.UserName.value).subscribe(
    data => {

  if (data[0].UserName === this.Current_UserName){this.FindPhone(); } else{this.UsernameError = true; return; }
            },

    error => { this.FindPhone(); });
}


FindPhone(){

  return  this.Userservice.GetUserByPhone(this.f.PhoneNo.value).subscribe(
    data => {
      if (data[0].PhoneNo === this.currentPhone){this.AddUser(); }else{
      this.PhoneError = true; return; }},
     error => {this.AddUser();  });

}

  ProcessForm(){
    this.Submitted = true;
    if (this.FormData.invalid){  return false;  }

    this.Loading = true;
    this.FindUserName();

  }

AddUser(){

  this.Userservice.UpdateUser(this.UserId, this.FormData.value).subscribe(
   data =>  {this.Success = true; },
   error => { this.Error = true; }

  );

}

}
