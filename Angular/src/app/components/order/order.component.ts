import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent implements OnInit {
  orders: any;

  constructor(private ordersevice: OrderService) { }

  ngOnInit(): void {
    this.ordersevice.getOrders();
    this.GetOrders();
  }

  GetOrders() {
    if (this.ordersevice.Lodingorder) return;
    this.ordersevice.Lodingorder = true;
    this.ordersevice.orderData$.subscribe((order) => {
      this.orders = order;
    });
  }

  CancelOrders(id: any) {
    this.ordersevice.CancelOrder(id);
  }
}
