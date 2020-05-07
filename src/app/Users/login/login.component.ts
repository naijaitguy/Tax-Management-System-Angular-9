import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


Loading = false;
FormData: FormGroup;
Submitted = false;
InvalidUser: any;
unamePattern = '^[a-z0-9_-]{8,15}$';
pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private route: Router, private Fb: FormBuilder, private Userservicr: UserServiceService) {

this.FormData = this.Fb.group({

  Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  Password: ['', [Validators.required, Validators.minLength(6)]]

});

  }

  ngOnInit(): void {

this.Userservicr.LogOutUser();

  }



 get f(){ return this.FormData.controls; }
ProcessForm(FormData){
this.Submitted = true;
if (!this.FormData.valid)
{ return false; }

this.Loading = true;

this.Userservicr.UserLogin(this.f.Email.value, this.f.Password.value).pipe(first())
 .subscribe( User => { this.route.navigate(['User/Home']); }
  , error => {   this.InvalidUser = true; this.Loading = true; });


}

}
