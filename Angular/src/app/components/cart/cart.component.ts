import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  CartProduct: any[] = [];
  TotalPrice: number = 0;
  localCartProgress = () => this.cartService.Lodingcart;

  constructor(private cartService: CartService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.GetCart();
  }
  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  UpdateQuantity(event: any, id: string) {

    if (this.cartService.Lodingcart) return;
    this.cartService.Lodingcart = true;
    let selectedValue = event.target.value;
    this.cartService.updateQtycart(selectedValue, id);
  }

  PlaceOrder() {
    if (this.cartService.Lodingcart) return;
    this.cartService.Lodingcart = true;


    if (this.CartProduct.length <= 0) return;
    const headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
    let PlaceOrderURL = `http://localhost:3000/api/order/add`;
    this.http.post(PlaceOrderURL, null, { headers: headers }).subscribe((res: any) => {
      let CheckoutURL = `http://localhost:3000/api/payment/checkout/${res._id}`;
      this.http.post(CheckoutURL, null, { headers: headers }).subscribe((r: any) => {
        window.location.href = r.paymentlink
      })
    });
  }

  RemoveProduct(id: string) {
    if (this.cartService.Lodingcart) return;
    this.cartService.Lodingcart = true;
    this.cartService.removefromcart(id);
  }

  GetCart(): void {
    if (this.cartService.Lodingcart) return;
    this.cartService.Lodingcart = true;
    this.cartService.GetCart();
    this.cartService.cartData$.subscribe((cartData: any) => {
      this.CartProduct = cartData;
      this.TotalPrice = cartData.TotalPrice;
      this.TotalPrice = this.GetTotalPrice(cartData);
    });
  }

  GetTotalPrice(cart: any) {
    let total = 0;
    cart.forEach((item: any) => {
      if (item.Product.Discount > 0) {
        total +=
          (item.Product.productPrice -
            item.Product.productPrice * (item.Product.Discount / 100)) *
          item.Quantity;
      } else {
        total += item.Product.productPrice * item.Quantity;
      }
    });
    return total;
  }
}