import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TaxAppmodel } from '../Models/TaxAppModel';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaxAppServicesService {

  htttoption = { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'}) };
  ApiUrl = 'https://localhost:44371/api/';
  constructor(private Http: HttpClient) { }

GetAllTaxApp(): Observable  <TaxAppmodel[]>

{

  return this.Http.get<TaxAppmodel[]>( this.ApiUrl + 'TaxApplication/getall').pipe(retry(1), catchError(this.errorHandle));

}



GetTaxAppById(TaxAppId): Observable  <TaxAppmodel>

{

  return this.Http.get<TaxAppmodel>( this.ApiUrl + 'TaxApplication/GetById/' + TaxAppId ).pipe(retry(1), catchError(this.errorHandle));

}



GetTaxAppByBVN(BVN): Observable  <TaxAppmodel>

{

  return this.Http.post<TaxAppmodel>( this.ApiUrl + 'TaxApplication/PostFindByBVN', {BVN }).pipe(retry(1), catchError(this.errorHandle));

}


GetTaxAppByTIN(TIN): Observable  <TaxAppmodel>

{

  return this.Http.post<TaxAppmodel>( this.ApiUrl + 'TaxApplication/PostFindByTIN', {TIN} )
  .pipe(retry(1), catchError(this.errorHandle));

}



GetTaxAppByEmail(Email): Observable  <TaxAppmodel>

{

  return this.Http.post<TaxAppmodel>( this.ApiUrl + 'TaxApplication/PostFindByEmail', {Email} )
  .pipe(retry(1), catchError(this.errorHandle));

}


AddTaxApplication(TaxAppModel): Observable  <TaxAppmodel>

{

  return this.Http.post<TaxAppmodel>( this.ApiUrl + 'TaxApplication/AddTaxApp', JSON.stringify(TaxAppModel), this.htttoption )
  .pipe(retry(1), catchError(this.errorHandle));

}



UpdateTaxApplication(TaxAppId, TaxAppModel): Observable  <TaxAppmodel>

{

  return this.Http.post<TaxAppmodel>( this.ApiUrl + 'TaxApplication/Update/' + TaxAppId , JSON.parse(TaxAppModel) )
  .pipe(retry(1), catchError(this.errorHandle));

}



DeleteTaxApplication(TaxAppId)

{

  return this.Http.delete<any>( this.ApiUrl + 'TaxApplication/Delete/' + TaxAppId)
  .pipe(retry(1), catchError(this.errorHandle));

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
