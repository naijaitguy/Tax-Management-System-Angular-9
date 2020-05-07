import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Observable } from 'rxjs';
import { TaxRegModel } from 'src/app/Models/TaxRegModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
User: Observable<TaxRegModel>
Id:any;
  constructor(private UserService: UserServiceService) {
 this.User =   (JSON.parse(localStorage.getItem('CurrentUser')));
this.Id = (this.User[0].UserId);

   }

  ngOnInit(): void {
  }

}
