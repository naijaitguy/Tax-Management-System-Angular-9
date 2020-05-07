import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-paytax',
  templateUrl: './paytax.component.html',
  styleUrls: ['./paytax.component.css']
})
export class PaytaxComponent implements OnInit {


  FormData: FormGroup;
  Submitted = false;
  Loading = false;

  constructor(private fb: FormBuilder) { 
this.FormData = this.fb.group({

  TIN: ['', Validators.compose([Validators.required])],
  Amount: ['' , Validators.compose([Validators.required])]
});

  }

  ngOnInit(): void {
  }

  get f(){

    return this.FormData.controls;
  }

  ProcessForm(){
this.Submitted = true;
if(this.FormData.invalid){return false;}

this.Loading = true;
  }

}
