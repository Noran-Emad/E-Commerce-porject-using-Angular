// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorComponent } from '../components/error/error.component';
import { TempAuthService } from './temp-auth.service';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartData$: Observable<any[]> = this.cartDataSubject.asObservable();

  public Lodingcart: boolean = false;

  public static disablecart: boolean = false;

  constructor(private http: HttpClient,private auth:TempAuthService) { }



  GetCart(): void {
    /* if the user logged get the cart from the backend */
    if(this.auth.IsLogged()){
      
      const cartURL = 'http://localhost:3000/api/cart/';
      this.http.get<any[]>(cartURL).subscribe((cartData: any) => {
        this.cartDataSubject.next(cartData?.CartProducts ?? []);
        this.Lodingcart = false;
      },
      (error) => {
        ErrorComponent.ShowMessage(error.error)
      });
    }else{
        /* if the user is guest get the cart from the local storage */
        let tempcart = localStorage.getItem('tempcart')?? '[]';
        this.cartDataSubject.next(JSON.parse(tempcart));
        this.Lodingcart = false;
      }
  }


  addToCart(item: any): void {

    /* add item to the cart whether if user logged in or not */
    let currentCartData = this.cartDataSubject.getValue();
    let updatedcart = [...currentCartData, item]
    this.cartDataSubject.next(updatedcart);
    if(this.auth.IsLogged()){

      /* if logged add it by api */
      this.http.post('http://localhost:3000/api/cart/add',
      { Product: item.Product._id, Quantity: item.Quantity || 1 }).subscribe(() =>{
        this.cartDataSubject.next(updatedcart)
        CartService.disablecart = false;
      },
      (error) => {
        ErrorComponent.ShowMessage(error.error)
        CartService.disablecart = false;
        this.cartDataSubject.next(currentCartData);
      });
    }else{
      /* if not logged just update the temp cart in the local storage */
      localStorage.setItem('tempcart',JSON.stringify(this.cartDataSubject.getValue()))
      CartService.disablecart = false;
    }
  }


  async removefromcart(id: string) {
    /* remove the product from the cart whether if user logged in or not */
    let currentCartData = this.cartDataSubject.getValue();
    let updated = currentCartData.filter((item) => item.Product._id !== id);
    this.cartDataSubject.next(updated);

    if(this.auth.IsLogged()){
      /* if logged remove it by api */
      let RemoveFromcartURL = `http://localhost:3000/api/Cart/remove/${id}`;
      this.http.delete(RemoveFromcartURL).subscribe(() => {
        CartService.disablecart = false;
      },
      (error) => {
        ErrorComponent.ShowMessage(error.error)
        this.cartDataSubject.next(currentCartData);
        CartService.disablecart = false;
      });
    }else{
      /* if not logged just update the temp cart in the local storage */
      localStorage.setItem('tempcart',JSON.stringify(this.cartDataSubject.getValue()))
      CartService.disablecart = false;
    }
  }
  
  updateQtycart(newQty: number, pid: string) {
    /* update the product qty in the cart whether if user logged in or not */
    let currentCartData = this.cartDataSubject.getValue();
    let oldcart = this.cartDataSubject.getValue();
    
    currentCartData.forEach((item) => {
      if (item.Product._id === pid)
        item.Quantity = newQty;
      this.cartDataSubject.next(currentCartData);
    });
    

    if(this.auth.IsLogged()){
      /* if logged update the cart by api */
      let UpdateProduct = `http://localhost:3000/api/cart/update/${pid}`;
      this.http.patch(UpdateProduct, { Quantity: newQty }).subscribe(() => {
        CartService.disablecart = false;
      },
      (error) => {
        ErrorComponent.ShowMessage(error.error)
        
        this.cartDataSubject.next(oldcart);
        CartService.disablecart = false;
      });
    }else{
      /* if not logged just update the temp cart in the local storage */
      localStorage.setItem('tempcart',JSON.stringify(this.cartDataSubject.getValue()))
      CartService.disablecart = false;
    }
  }


  isLoding(): boolean {
    return this.Lodingcart;
  }

}
