import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaxRegModel } from 'src/app/Models/TaxRegModel';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
FormData: FormGroup;
Submitted = false;
Loading = false;
localUser : TaxRegModel;
  constructor( private fb: FormBuilder) { 

    this.FormData = this.fb.group({
Name: ['', [Validators.compose([Validators.required])]],
Email: ['', [Validators.compose([Validators.required])]],
Phone: ['', [Validators.compose([Validators.required])]],
Comment: ['', [Validators.compose([Validators.required])]],

    });
  }

  ngOnInit(): void {

    this.localUser = JSON.parse(localStorage.getItem('CurrentUser'));
   

    this.FormData.controls.Email.setValue(this.localUser[0].Email);
    this.FormData.controls.Phone.setValue(this.localUser[0].PhoneNo);
    this.FormData.controls.Name.setValue(this.localUser[0].FullName);
  }



  get f(){ return this.FormData.controls;}
ProcessForm(){

  this.Submitted = true;
  if(this.FormData.invalid){return false;}
this.Loading = true;



}

}
