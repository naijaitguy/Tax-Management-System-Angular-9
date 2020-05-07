import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  FormData: FormGroup;
  Submitted = false;
  Error = false;
  Loading = false;
  EmailError = false;
  PhoneError = false;
  UsernameError = false;
  Success = false;

  unamePattern = '^[a-z0-9_-]{8,15}$';
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private fb: FormBuilder, private Userservice: UserServiceService) {
  this.FormData = this.fb.group({
  Email: ['', [Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])]],
  Password: ['' , [Validators.compose([Validators.required, Validators.minLength(6)])]],
  UserName: ['', [Validators.compose([Validators.required, Validators.minLength(3)])]],
  FullName: ['', [Validators.compose([Validators.required])]],
  PhoneNo: ['', [Validators.compose([Validators.required])]],
  Address: ['' , [Validators.compose([Validators.required])]],
  Confirm_Password: ['', [Validators.compose([Validators.required, Validators.minLength(6)])]]

  });

   }



  ngOnInit(): void {
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
              this.UsernameError = true; return; },

    error => { this.FindEmail(); });
}


FindEmail(){

  return this.Userservice.GetUserBYEmail(this.f.Email.value).subscribe(
    data => {  this.EmailError = true; return; },
    error => { this.FindPhone(); });

}

FindPhone(){

  return  this.Userservice.GetUserByPhone(this.f.PhoneNo.value).subscribe(
    data => {  this.PhoneError = true; return; },
     error => {this.AddUser();  });

}

  ProcessForm(){
    this.Submitted = true;
    if (this.FormData.invalid){  return false;  }

    this.Loading = true;
    this.FindUserName();
  console.log(this.FormData.value);
  }

AddUser(){

  this.Userservice.RegisterUser(this.FormData.value).subscribe(
   data =>  {this.Success = true; },
   error => { this.Error = true; }

  );

}

}
