import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorComponent } from '../error/error.component';
import { TempAuthService } from '../../services/temp-auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  CartProduct: any[] = [];
  TotalPrice: number = 0;
  localCartProgress = () => this.cartService.Lodingcart;
  disablecart = ():boolean => CartService.disablecart;

  constructor(private cartService: CartService, private http: HttpClient, private auth: TempAuthService) { }

  ngOnInit(): void {
    this.GetCart();
  }
  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  UpdateQuantity(event: any, id: string) {
    CartService.disablecart = true;
    let selectedValue = event.target.value;
    this.cartService.updateQtycart(selectedValue, id);
  }

  PlaceOrder() {
    if (this.cartService.Lodingcart ||!this.auth.IsLogged()) return;
    this.cartService.Lodingcart = true;

    // if (!this.auth.IsLogged())
    /* implement navigation to login page here */

    if (this.CartProduct.length <= 0) return;
    const headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
    let PlaceOrderURL = `http://localhost:3000/api/order/add`;
    this.http.post(PlaceOrderURL, null, { headers: headers }).subscribe((res: any) => {
      let CheckoutURL = `http://localhost:3000/api/payment/checkout/${res._id}`;
      this.http.post(CheckoutURL, null, { headers: headers }).subscribe((r: any) => {
        window.location.href = r.paymentlink
      })
    },error=> ErrorComponent.ShowMessage(error.error));
  }

  RemoveProduct(id: string) {
    CartService.disablecart = true;
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