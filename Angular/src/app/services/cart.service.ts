// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartComponent } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });

  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartData$: Observable<any[]> = this.cartDataSubject.asObservable();

  public Lodingcart: boolean = false;

  constructor(private http: HttpClient) { }

  GetCart(): void {
    const cartURL = 'http://localhost:3000/api/cart/';
    this.http.get<any[]>(cartURL, { headers: this.headers }).subscribe(
      (cartData: any) => {
        this.cartDataSubject.next(cartData?.CartProducts ?? []);
        this.Lodingcart = false;
      },
      (error) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }

  addToCart(item: any): void {
    let currentCartData = this.cartDataSubject.getValue();
    this.http.post('http://localhost:3000/api/cart/add',
      { Product: item.Product._id, Quantity: item.Quantity | 1 },
      { headers: this.headers }).subscribe(() => {
        currentCartData.push(item);
        this.cartDataSubject.next(currentCartData);
        this.Lodingcart = false;

      });
  }

  async removefromcart(id: string) {
    let RemoveFromcartURL = `http://localhost:3000/api/Cart/remove/${id}`;
    this.http.delete(RemoveFromcartURL, { headers: this.headers }).subscribe(() => {
      let currentCartData = this.cartDataSubject.getValue();
      let updated = currentCartData.filter((item) => item.Product._id !== id);
      this.cartDataSubject.next(updated);
      this.Lodingcart = false;

    });
  }

  updateQtycart(newQty: number, pid: string) {
    const headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
    let currentCartData = this.cartDataSubject.getValue();
    let UpdateProduct = `http://localhost:3000/api/cart/update/${pid}`;

    this.http.patch(UpdateProduct, { Quantity: newQty }, { headers }).subscribe(() => {
      currentCartData.forEach((item) => {
        if (item.Product._id === pid)
          item.Quantity = newQty;
        this.cartDataSubject.next(currentCartData);
      });
      this.Lodingcart = false;

    });
  }

  isLoding(): boolean {
    return this.Lodingcart;
  }
}
