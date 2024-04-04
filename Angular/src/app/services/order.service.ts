import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  Lodingorder: boolean = false;

  private OrderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  orderData$: Observable<any[]> = this.OrderDataSubject.asObservable();


  getOrders(page:number): void {
    this.http.get(`http://localhost:3000/api/order/getAll?page=${page}`).subscribe((res: any) => {
      this.OrderDataSubject.next(res);  
        this.Lodingorder = false;
    });
  }

  CancelOrder(id: any): void {
    this.http.patch(`http://localhost:3000/api/order/cancel/${id}`, null).subscribe((res: any) => {
      this.Lodingorder = false;
    });
  }

}