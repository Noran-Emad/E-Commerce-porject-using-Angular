import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  Lodingorder: boolean = false;

  headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
  private OrderDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  orderData$: Observable<any[]> = this.OrderDataSubject.asObservable();


  getOrders(): void {
    this.http.get('http://localhost:3000/api/order/getAll/', { headers: this.headers }).subscribe((res: any) => {
      this.OrderDataSubject.next(res);
      this.Lodingorder = false;
    });
  }

  CancelOrder(id: any): void {
    let currentorder = this.OrderDataSubject.getValue();
    this.http.patch(`http://localhost:3000/api/order/cancel/${id}`, null, { headers: this.headers }).subscribe((res: any) => {
      let currentorder = this.OrderDataSubject.getValue();
      currentorder.forEach((order) => {
        if (order._id === id)
          order.OrderStatus = 'canceled'
      })
      this.OrderDataSubject.next(currentorder);
      this.Lodingorder = false;
    });
  }

}