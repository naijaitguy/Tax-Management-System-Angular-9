import { Injectable, Type } from '@angular/core';
import {HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AdminModel} from '../Models/AdminModel';
import {retry, catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

ApiRoute = 'https://localhost:44371/api/admin/';

ReturnUrl: string;

 httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})};

  constructor(private Http: HttpClient) { }

  GetAllAdmin(): Observable<Array<AdminModel>>
  {

return this.Http.get<Array<AdminModel>>(this.ApiRoute + 'getall')
.pipe(retry(1),
 catchError(this.errorHandle));

  }

  LoginAdmin(Email: any, Password: any)  {
    return this.Http.post<any>(this.ApiRoute + 'AdminLogin' , {Email, Password})
    .pipe(map(AdminModel => {
localStorage.setItem('AdminUser', JSON.stringify(AdminModel));

return AdminModel; }
    ));

  }

    Isloggin(){
   if (localStorage.getItem('AdminUser') !== null){
      return true;
   } else{ return false; }

   }


    GetAdminById( id: number): Observable<AdminModel>{
      return this.Http.get<AdminModel>(this.ApiRoute + 'GetById/' + id ).
      pipe(retry(1)
      , catchError(this.errorHandle));

    }


   DeleteUser(UserId){
   return this.Http.delete(this.ApiRoute + 'Delete/' + UserId).pipe(retry(1)
   ,catchError(this.errorHandle));

       }
  LogOut(){
  localStorage.removeItem('AdminUser');
  localStorage.clear();

  }











  errorHandle(error){
let errormgs = '';
if (error.error instanceof ErrorEvent){
    // get client side error

     errormgs = error.error.message;
}
 else {

  // get server-side error
       errormgs = `Error Code :${error.status}\nMessage: ${error.message}`;

 }

console.log(errormgs);
return throwError(errormgs);

  }
}
