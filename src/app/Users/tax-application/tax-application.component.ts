import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxAppServicesService } from 'src/app/Services/tax-app-services.service';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-tax-application',
  templateUrl: './tax-application.component.html',
  styleUrls: ['./tax-application.component.css']
})
export class TaxApplicationComponent implements OnInit {

  FormData: FormGroup;
  Submitted = false;
  Loading = false;
  BVNError = false;
  EmailError = false;
  RegisterdEmailError = false;
  Error = false;
  Succees = false;
  constructor( private fb: FormBuilder,
               private Userservice: UserServiceService,
               private ApplicationService: TaxAppServicesService,
               private Route: Router) {
this.FormData = this.fb.group({
  Email: ['', [Validators.compose([Validators.required])]],
  CompanyName: ['', [Validators.compose([Validators.required])]],
  CurrentSalary: ['', [Validators.compose([Validators.required])]],
  CompanyAddress: ['', [Validators.compose([Validators.required])]],
  CompanyPhoneNo: ['', [Validators.compose([Validators.required])]],
  StaffId: ['', [Validators.compose([Validators.required])]],
  CurrentPositon: ['', [Validators.compose([Validators.required])]],
  Bvn: ['', [Validators.compose([Validators.required])]],
  CompanyWebsite: ['', [Validators.compose([Validators.required])]],


});

   }

  ngOnInit(): void {
  }


get f(){ return this.FormData.controls; }


FindTIN(){
  this.ApplicationService.GetTaxAppByTIN('tin')
  .subscribe(  data => {}, error => {}


  );


}

FindRegisterdEmail(){
this.Userservice.GetUserBYEmail(this.f.Email.value)
.subscribe( data => { this.FindBVN(); },
 error => { this.RegisterdEmailError = true; } );

}

FindBVN(){
  this.ApplicationService.GetTaxAppByBVN(this.f.Bvn.value)
  .subscribe(  data => { this.BVNError = true; return; }, error => { this.FindEmail(); }


  );


}

FindEmail(){
  this.ApplicationService.GetTaxAppByEmail(this.f.Email.value)
  .subscribe(  data => { this.EmailError = true; return; }, error => { this.AddApplication(); }


  );


}

AddApplication(){
  this.Loading = true;
  this.ApplicationService.AddTaxApplication(this.FormData.value)
  .subscribe( data => { this.Succees = true;  this.Loading = false;}
  , error => {this.Error = true; } );

}

 ProcessForm(){
this.Submitted = true;
if (this.FormData.invalid){return false; }


this.FindRegisterdEmail();

 }



}
