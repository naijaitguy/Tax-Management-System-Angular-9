import { Component } from '@angular/core';
import { UserServiceService } from './Services/user-service.service';
import { TaxRegModel } from './Models/TaxRegModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaxMgs';
User: TaxRegModel;
  constructor(private UserService: UserServiceService){
 

  }

}
