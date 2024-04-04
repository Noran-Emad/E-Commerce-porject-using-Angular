import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ErrorComponent } from '../error/error.component';
import { TempAuthService } from '../../services/temp-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  CartProduct: any[] = [];
  Count: number = 0;

  constructor(private cartService: CartService,private auth:TempAuthService) { }
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
    this.Count = this.CartProduct.reduce((total:any, product:any) => +total + +product.Quantity, 0);
  }

  isuserLogged = this.auth.IsLogged;
  // LoginFun = () => this.auth.LoginFunction();
  LogoutFun = () =>this.auth.LogoutFunction();
  
  myalert = () => ErrorComponent.ShowMessage("Login first to perform this action")
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isSmallScreen = window.innerWidth >= 992;
  }

}