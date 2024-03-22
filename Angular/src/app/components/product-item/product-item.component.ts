import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() products: any;
  @Input() GetProducts: any;
  @Input() TotalPages: any;

  @Output() RefreshProducts: EventEmitter<any> = new EventEmitter<any>();


  static InProgress: boolean = false;
  cartSubscription?: Subscription;
  categorySubscription?: Subscription;
  productsSubscription?: Subscription;

  localCartProgress = () => this.cartservice.Lodingcart;

  constructor(
    private productservice: ProductService,
    private cartservice: CartService,
    private categoryservice: CategoryService,
    private rout: ActivatedRoute,
  ) { }

  categories: any;
  productflag = true;
  CartProduct: any[] = [];

  page: number = this.productservice.page;
  limit: number = this.productservice.limit;
  sort: string = this.productservice.sort;

  productSelectedPrice: { [productId: string]: number } = {};

  static FireOnce: boolean = true;
  ngOnInit() {
    this.productservice.limit = 30;
    this.productservice.page = 1;
    this.productservice.sort = 'Recommended';
    this.RenderGetProducts();
  }

  RenderGetProducts(): void {
    const categoryId = this.rout.snapshot.paramMap.get('id');

    /* if the limit change make the page to 1 because it will skip products with diffrent limit */
    if (this.productservice.limit !== this.limit) {
      this.productservice.page = 1;
      this.page = 1;
    } else {
      this.productservice.page = this.page;
    }

    this.productservice.limit = this.limit;
    this.productservice.sort = this.sort;

    this.CheckProductsifinCart(this.products);
    this.RefreshProducts.emit(categoryId);
  }

  /* if the products in the cart adjust the ui red/green */
  CheckProductsifinCart(products: any[]): void {
    this.cartservice.cartData$.subscribe((cart) => {

      products?.forEach((product: any) => {
        let exists = cart.some((item) => item.Product._id === product._id);
        product.incart = exists;
      });

    })
  }

  AddToCart(p: any) {
    if (this.cartservice.Lodingcart) return;
    if (this.IsLogged()) {
      this.cartservice.Lodingcart = true;
      p.incart = !p.incart;
      this.cartservice.addToCart({
        Product: p,
        Quantity: this.productSelectedPrice[p._id] || 1,
      });
    } else {
      /* Go To Login */
      alert("Login first to perform this action")
    }
  }

  RemoveFromCart(p: any) {
    if (this.cartservice.Lodingcart) return;
    this.cartservice.Lodingcart = true;
    p.incart = !p.incart;
    this.cartservice.removefromcart(p._id);
  }

  GetCategories() {
    this.categorySubscription = this.categoryservice.GetCategories()
      .subscribe((categoryData: any) => this.categories = categoryData);
  }

  OnproductQuantitychange(event: any, productId: string): void {
    let selectedValue = event.target.value;
    this.productSelectedPrice[productId] = selectedValue;
    this.GetProducts()
  }

  isproductinCart = (ssss: boolean): boolean => ssss;

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
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
    this.RenderGetProducts();
  }

  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  /* Temperory till user service is implemented */
  public IsLogged(): boolean {
    return localStorage.getItem('jwt') != null;
  }

}