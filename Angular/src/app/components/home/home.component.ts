import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  static InProgress: boolean = false;
  cartSubscription?: Subscription;
  categorySubscription?: Subscription;
  productsSubscription?: Subscription;

  localCartProgress = () => CartComponent.InProgress;

  constructor(
    private productservice: ProductService,
    private cartservice: CartService,
    private categoryservice: CategoryService
  ) {}

  categories: any;
  products: any[] = [];
  productflag = true;
  TotalPages: number = 1;
  CartProduct: any[] = [];

  page: number = this.productservice.page;
  limit: number = this.productservice.limit;
  sort: string = this.productservice.sort;

  productSelectedPrice: { [productId: string]: number } = {};

  static FireOnce: boolean = true;
  ngOnInit() {
    if (HomeComponent.FireOnce) {
      this.productservice.getProducts(true);
      HomeComponent.FireOnce = false;
    }
    this.productservice.limit = 30;
    this.productservice.page = 1;
    this.productservice.sort = 'Recommended';
    this.GetCategories();
    this.GetProducts(5);
  }


  GetProducts(id:any): void {

    if (HomeComponent.InProgress) return;
    HomeComponent.InProgress = true;

    this.categoryservice.GetCategories();
    this.productservice.getProducts(true);
    
    this.cartservice.cartData$.subscribe((cartData) => {
      this.productservice.productsData$.subscribe((productsData) => {
        this.products?.forEach((product: any) => {
          let exists = cartData.some((item) => item.Product._id === product._id);
          product.incart = exists;
          console.log(productsData)
        });
        this.products = productsData;
      });
      this.productservice.TotalPagesData$.subscribe((total)=> this.TotalPages = total)
      HomeComponent.InProgress = false;
    });
  }

  AddToCart(p: any) {
    if (CartComponent.InProgress) return;
    
    if (this.IsLogged()) {
      CartComponent.InProgress = true;
      p.incart = !p.incart;
      this.cartservice.addToCart({
        Product: p,
        Quantity: this.productSelectedPrice[p._id] | 1,
      });
    } else {
      /* Go To Login */
      alert("Login first to perform this action")
    }
  }

  RemoveFromCart(p: any) {
    if (CartComponent.InProgress) return;
    CartComponent.InProgress = true;
    p.incart = !p.incart;
    this.cartservice.removefromcart(p._id);
  }

  GetCategories() {
    this.categorySubscription = this.categoryservice
      .GetCategories()
      .subscribe((categoryData: any) => {
        this.categories = categoryData;
      });
  }

  OnproductQuantitychange(event: any, productId: string): void {
    let selectedValue = event.target.value;
    this.productSelectedPrice[productId] = selectedValue;
    this.GetProducts(5)
  }

  isproductinCart(ssss: boolean): boolean {
    return ssss;
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }

  refreshProducts() {
    this.productservice.limit = this.limit;
    this.productservice.page = this.page;
    this.productservice.sort = this.sort;
    this.productservice.getProducts(true);
  }

  GotoPage(Pnum: number): void {
    console.log(Pnum)
    if (Pnum <= this.TotalPages && Pnum > 0) {
      this.page = Pnum;
    } else if (Pnum >= this.TotalPages) {
      this.page = this.TotalPages;
    } else {
      this.page = 1;
    }
    this.GetProducts(4);
  }

  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  /* Temperory till user service is implemented */
  public IsLogged(): boolean {
    return localStorage.getItem('jwt') ? true : false;
  }
}