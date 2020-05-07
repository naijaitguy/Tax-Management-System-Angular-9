import { Injectable, Output } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TaxRegModel } from '../Models/TaxRegModel';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
// taxregistration/getbyid
  constructor(private Http: HttpClient) { }
  ApiRrl = 'https://localhost:44371/api/';

  ReturnUrl: string;


  httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})};
  /////// get  all users
  GetAllUser(): Observable<Array<TaxRegModel>>
  {
     return this.Http.get<Array<TaxRegModel>>(this.ApiRrl + 'taxregistration/getall')
     .pipe(retry(1),
     catchError(this.errorHandle));

  }

 GetUserBYEmail(Email){
return this.Http.post(this.ApiRrl + 'taxregistration/PostFindEmail', {Email}, this.httpOption)
.pipe(retry(1), catchError(this.errorHandle));

 }

 GetUserByUsername(Username){
  return this.Http.post(this.ApiRrl + 'taxregistration/PostFindUsername' , {Username} , this.httpOption)
  .pipe(retry(1), catchError(this.errorHandle));
 }

 GetUserByPhone(PhoneNo){
  return this.Http.post(this.ApiRrl + 'taxregistration/FindPhone' , {PhoneNo}, this.httpOption)
  .pipe(retry(1), catchError(this.errorHandle));
 }
/////// get user by the id number
  GetUserById(Id: number): Observable<TaxRegModel> {

    return this.Http.get<TaxRegModel>(this.ApiRrl + 'taxregistration/getbyid/' + Id)
    .pipe(retry(1),
    catchError(this.errorHandle));
  }


  ////// Add New User

  RegisterUser(Model) {
return this.Http.post<TaxRegModel>(this.ApiRrl + 'taxregistration/AddUser', JSON.stringify(Model), this.httpOption)
.pipe(retry(1), catchError(this.errorHandle));


  }

  UserLogin(Email: any , Password: any)
  {
   return this.Http.post<any>( this.ApiRrl  + 'taxregistration/UserLogin ', { Email, Password}, this.httpOption)
   .pipe(map(TaxRegModel => {

    localStorage.setItem('CurrentUser', JSON.stringify(TaxRegModel));
    return TaxRegModel;
   } ),
    catchError(this.errorHandle) );

  }


     UpdateUser(id: number, TaxRegModel: any): Observable<TaxRegModel>
  {
return this.Http.put<TaxRegModel>(this.ApiRrl + 'taxregistration/UpdateUser/' + id, JSON.stringify(TaxRegModel), this.httpOption)
.pipe(retry(1),
 catchError(this.errorHandle));

      }



     LogOutUser(){

     localStorage.removeItem('CurrentUser');
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


      Isloggin(){
        if (localStorage.getItem('CurrentUser') !== null){
           return true;
        } else{ return false; }
        }
      DeleteUser(UserId){
     return this.Http.delete(this.ApiRrl + 'taxregistration/Delete/' + UserId)
     .pipe(retry(1),catchError(this.errorHandle));
      }





}
