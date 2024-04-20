import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorComponent } from '../error/error.component';
import { TempAuthService } from '../../services/temp-auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { min } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  myForm:FormGroup; 

  getControls() {
    return this.myForm.controls;
  }


  CartProduct: any[] = [];
  TotalPrice: number = 0;
  localCartProgress = () => this.cartService.Lodingcart;
  disablecart = ():boolean => CartService.disablecart;

  constructor(private cartService: CartService, private http: HttpClient, private auth: TempAuthService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.GetCart();

    this.myForm = this.formBuilder.group({
      shippingAddress: ['', [Validators.required, this.trimAndMinLengthValidator(6)]]
    });
    
  }
  trimAndMinLengthValidator(minLength: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const trimmedValue = control.value.trim(); // Trim the input value
      if (trimmedValue.length < minLength) {
        return { minLength: true };
      }
      return null;
    };
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
    
    if (!this.auth.IsLogged()){
      this.router.navigate(['/login']);
      return;
    }
    if (this.myForm.invalid) return;
    
    this.cartService.Lodingcart = true;

    if (this.CartProduct.length <= 0) return;
    let PlaceOrderURL = `http://localhost:3000/api/order/add`;
    this.http.post(PlaceOrderURL, this.myForm.value).subscribe((res: any) => {
      let CheckoutURL = `http://localhost:3000/api/payment/checkout/${res._id}`;
      this.http.post(CheckoutURL, null).subscribe((r: any) => {
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

 clearCart():void{
  this.cartService.clearCart();
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