import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { error } from 'console';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor( private httpClient:HttpClient) {

   }

   addproduct(productData:FormData):Observable<any>{
    const token = localStorage.getItem("userToken");
   if (token) {
    
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     const headersOptions = { headers: headers };

     return this.httpClient.post('http://localhost:3000/api/Products',productData, headersOptions)
       .pipe(
         catchError(error => {
           console.error('Error fetching products:', error);
           return throwError(error);
         })
       );
   } else {
     return throwError("User token not found in local storage");
   }
   }
   getAllProducts(): Observable<any> {
    const token = localStorage.getItem("userToken");
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get('http://localhost:3000/api/v1/admin/products', { headers })
        .pipe(
          catchError(error => {
            // Handle the error here, log it or do other actions if necessary
            console.error('Error fetching products:', error);
            // Forward the error by returning an observable that emits the error
            return throwError(error);
          })
        );
    } else {
      // If token is not available, return an observable with an error message
      return throwError("User token not found in local storage");
    }
  }
  updateProduct(id:string,productData:FormData):Observable<any>{
    const token = localStorage.getItem("userToken");
   if (token) {
    
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     const headersOptions = { headers: headers };

     return this.httpClient.patch(`http://localhost:3000/api/v1/products/${id}`,productData, headersOptions)
       .pipe(
         catchError(error => {
           console.error('Error fetching products:', error);
           return throwError(error);
         })
       );
   } else {
     return throwError("admin token not found in local storage");
   }
   }
   DeleteProduct(id:string){
    const token = localStorage.getItem("userToken");
   if (token) {
    
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     const headersOptions = { headers: headers };

     return this.httpClient.delete(`http://localhost:3000/api/v1/products/${id}`,headersOptions)
       .pipe(
         catchError(error => {
           console.error('Error fetching products:', error);
           return throwError(error);
         })
       );
   } else {
     return throwError("admin token not found in local storage");
   }
   }
   getCategories(): Observable<any> {
    const token = localStorage.getItem("userToken");
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get('http://localhost:3000/api/v1/admin/categories', { headers })
        .pipe(
          catchError(error => {
            // Handle the error here, log it or do other actions if necessary
            console.error('Error fetching products:', error);
            // Forward the error by returning an observable that emits the error
            return throwError(error);
          })
        );
    } else {
      // If token is not available, return an observable with an error message
      return throwError("User token not found in local storage");
    }
  }
  getProductById(id:string):Observable<any>{

    return this.httpClient.get(`http://localhost:3000/api/v1/products/${id}`);

   }
  //  getAllOrders(){

  //   return this.httpClient.get<any>(environment.baseUrl + '/order/admin' );
  //  }
  //  deleteOrder(id:string){

  //   return this.httpClient.delete<any>(`${environment.baseUrl}/order/${id}` );
  //  }
  //  getAllOrdersPending(){

  //   return this.httpClient.get<any>(environment.baseUrl + '/order/admin/pending' );
  //  }
  //  updateStatusOrder(data:{status:string,id:string}){

  //   return this.httpClient.patch<{status:string,id:string}>(environment.baseUrl + '/order/admin',data );
  //  }
}