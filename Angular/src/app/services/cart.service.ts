// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { CartComponent } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartData$: Observable<any[]> = this.cartDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  GetCart(): void {
    const cartURL = 'http://localhost:3000/api/cart/';
    this.http.get<any[]>(cartURL, { headers: this.headers }).subscribe(
      (cartData: any) => {
        this.cartDataSubject.next(cartData?.CartProducts ?? []);
        CartComponent.InProgress = false;
      },
      (error) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }

  addToCart(item: any): void {
    let currentCartData = this.cartDataSubject.getValue();
    currentCartData.push(item);
    this.cartDataSubject.next(currentCartData);
    console.log('item', item)
    this.http.post('http://localhost:3000/api/cart/add',
      { Product: item.Product._id, Quantity: item.Quantity | 1 },
      { headers: this.headers }).subscribe(() => {
        CartComponent.InProgress = false;
      });
  }

  async removefromcart(id: string) {
    let currentCartData = this.cartDataSubject.getValue();
    let updated = currentCartData.filter((item) => {
      return item.Product._id !== id;
    });
    this.cartDataSubject.next(updated);

    let RemoveFromcartURL = `http://localhost:3000/api/Cart/remove/${id}`;
    this.http.delete(RemoveFromcartURL, { headers: this.headers }).subscribe(() => {
      CartComponent.InProgress = false;
    });
  }

  updateQtycart(newQty: number, pid: string) {
    const headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
    let currentCartData = this.cartDataSubject.getValue();
    let UpdateProduct = `http://localhost:3000/api/cart/update/${pid}`;

    let flag = false;
    currentCartData.forEach((item) => {
      if (item.Product._id === pid) {
        item.Quantity = newQty;
        flag = true;
      }
    });

    this.cartDataSubject.next(currentCartData);
    if (flag) this.http.patch(UpdateProduct, { Quantity: newQty }, { headers }).subscribe(() => {
      CartComponent.InProgress = false;
    });
  }

}
