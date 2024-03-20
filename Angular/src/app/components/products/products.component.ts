import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {

  constructor(private productservice: ProductService, private cartservice: CartService, private route: ActivatedRoute, private http: HttpClient) { }
  static InProgress: boolean = false;

  id = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
  product: any;
  outQuantity: any = 1;

  isProductinCart: boolean = false;

  inQuantity: any;

  ngOnInit() {
    this.GetProduct()
  }

  GetProduct() {
    this.productservice.GetaProduct(this.id);
    this.cartservice.cartData$.subscribe((cartData: any[]) => {

      this.productservice.aproductData$.subscribe((product) => {
        this.product = product;
        let exiest = cartData.filter(e => e.Product._id === this.product._id)[0];
        this.inQuantity = exiest.Quantity;
        exiest ? this.isProductinCart = true : null
      })
    })

  }

  AddToCart(p: any) {
    if (!localStorage.getItem('jwt')) {
      alert('You need to login first')
    } else {

      if (CartComponent.InProgress) return;
      CartComponent.InProgress = true;
      p.incart = !p.incart;
      this.cartservice.addToCart({ Product: p, Quantity: this.outQuantity | 1 })
      this.isProductinCart = true;
    }
  }
  RemoveFromCart(p: any) {
    if (CartComponent.InProgress) return;
    CartComponent.InProgress = true;
    p.incart = !p.incart;
    this.cartservice.removefromcart(p._id);
    this.isProductinCart = false;
  }

  UpdateQuantity(event: any, id: string) {
    if (CartComponent.InProgress) return;
    CartComponent.InProgress = true;
    let selectedValue = event.target.value;
    this.cartservice.updateQtycart(selectedValue, id);
  }


  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }
}
