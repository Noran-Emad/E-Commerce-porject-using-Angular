import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { TempAuthService } from '../../services/temp-auth.service';

@Component({
  selector: 'app-loding',
  templateUrl: './loding.component.html',
  styleUrl: './loding.component.css'
})
export class LodingComponent {

  constructor(private productservice:ProductService,private cartservice:CartService,private ordersevice:OrderService, private auth:TempAuthService){}

  localProductProgress = () => this.productservice.Lodingproduct;
  localCartProgress = () => this.cartservice.Lodingcart;
  localorderProgress = () => this.ordersevice.Lodingorder;
  localauthProgress = () => this.auth.Lodingauth;
}