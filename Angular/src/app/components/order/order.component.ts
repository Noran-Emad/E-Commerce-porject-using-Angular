import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent implements OnInit {
  orders: any;
  page: number = 1;
  totalpages: number = 1;

  constructor(private ordersevice: OrderService) { }

  ngOnInit(): void {
    this.ordersevice.getOrders(1);
    this.GetOrders(1);
  }
  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }
  LodingLocalOrder = () => this.ordersevice.Lodingorder;
  GetOrders(page:number) {
    this.page = page;
    if (this.ordersevice.Lodingorder) return;
    this.ordersevice.getOrders(page);
    this.ordersevice.Lodingorder = true;
    
    this.ordersevice.orderData$.subscribe((order:any) => {
      this.orders = order.order;
      this.totalpages = order.TotalPages;
    });
  }

  CancelOrders(id: any) {
    this.ordersevice.CancelOrder(id);
    this.GetOrders(1)
    this.page = 1;
  }

}