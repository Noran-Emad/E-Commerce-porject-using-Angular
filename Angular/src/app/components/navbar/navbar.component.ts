import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  CartProduct: any[] = [];
  Count: number = 0;

  constructor(private cartService: CartService) { }
  isSmallScreen: boolean = true;

  ngOnInit(): void {
    this.GetCart();
    this.isSmallScreen = window.innerWidth < 1200;
    this.checkScreenWidth();
  }

  GetCart(): void {
    this.cartService.GetCart();
    this.cartService.cartData$.subscribe((cartData: any) => {
      this.CartProduct = cartData;
      this.CartitemCount();
    });
  }

  CartitemCount(): void {
    this.Count = this.CartProduct.reduce((total, product) => +total + +product.Quantity, 0);
  }

  isuserLogged() {
    return localStorage.getItem('jwt') ? true : false;
  }

  myalert() {
    alert("Login first to perform this action")
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isSmallScreen = window.innerWidth >= 992;
  }

}