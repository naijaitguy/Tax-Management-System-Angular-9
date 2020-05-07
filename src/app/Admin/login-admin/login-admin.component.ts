import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/Services/admin-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  FormData: FormGroup;
  Submitted = false;
  InvalidUser: any;
  Loading: any;
  unamePattern = '^[a-z0-9_-]{8,15}$';
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    constructor(private route: Router, private Fb: FormBuilder, private AdminService: AdminServiceService) {

  this.FormData = this.Fb.group({

    Email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    Password: ['', [Validators.required, Validators.minLength(6)]]

  });

    }

    ngOnInit(): void {

      this.AdminService.LogOut();
    }



   get f(){ return this.FormData.controls; }
  ProcessForm(FormData1){
  this.Submitted = true;
  if (!this.FormData.valid)
  { return false; }

  this.Loading = true;
  this.AdminService.LoginAdmin(this.f.Email.value, this.f.Password.value).pipe(first()).subscribe(
    data => {
    this.route.navigate(['Admin/Home']); },
    error => {
      this.InvalidUser = true;
      this.Loading = false; }

  );

  }

  }
