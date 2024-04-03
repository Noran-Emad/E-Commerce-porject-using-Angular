import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct} from '../../../app/components/products/model'
@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

   baseUrl="http://localhost:3000"
  constructor( private httpClient:HttpClient) {

   }

   addProduct(product:Iproduct){

    return this.httpClient.post<Iproduct>(this.baseUrl + '/products', product );
   }
   getAllProduct(){

    return this.httpClient.get<any>(this.baseUrl + '/products' );
   }
   getbyname(name:string){
    return this.httpClient.get<any>(`${this.baseUrl}/products/${name}`)
   }
   updateProduct(payLoad:Iproduct,id:string){

    return this.httpClient.patch<Iproduct>(`${this.baseUrl}/products/${id}`,payLoad );
   }
   deleteProduct(id:string){

    return this.httpClient.delete<Iproduct>(`${this.baseUrl}/products/${id}` );
   }
   getAllOrders(){

    return this.httpClient.get<any>(this.baseUrl + '/order/admin' );
   }
   deleteOrder(id:string){

    return this.httpClient.delete<any>(`${this.baseUrl}/order/${id}` );
   }
   getAllOrdersPending(){

    return this.httpClient.get<any>(this.baseUrl + '/order/admin/pending' );
   }
   updateStatusOrder(data:{status:string,id:string}){

    return this.httpClient.patch<{status:string,id:string}>(this.baseUrl + '/order/admin',data );
   }
}