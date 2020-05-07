import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculate-tax',
  templateUrl: './calculate-tax.component.html',
  styleUrls: ['./calculate-tax.component.css']
})
export class CalculateTaxComponent implements OnInit {

  FormData: FormGroup;
  Submitted = false;
  Loading = false;

  constructor(private fb: FormBuilder) { 

    this.FormData = this.fb.group({
      Income: ['', Validators.compose([Validators.required])],
      Relief: ['', Validators.compose([Validators.required])]
    });

  }

  ngOnInit(): void {
  }

  get f(){ return this.FormData.controls;}

  ProcessForm(){
this.Submitted = true;
if(this.FormData.invalid){return false;}
this.Loading = true;

  }

}
