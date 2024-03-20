import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  CartProduct: any[] = [];
  Count: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.GetCart();
  }
  
  GetCart(): void {
    this.cartService.GetCart();
    this.cartService.cartData$.subscribe((cartData:any) => {
      this.CartProduct = cartData;
      this.CartitemCount();
    });
  }

  CartitemCount(): void {
    this.Count = this.CartProduct.reduce((total, product) => +total + +product.Quantity, 0);
  }

  isuserLogged(){
  return  localStorage.getItem('jwt')? true:false;
  }

  myalert(){
    alert("Login first to perform this action") 
   }
}
