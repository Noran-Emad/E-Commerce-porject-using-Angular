import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { TempAuthService } from '../../services/temp-auth.service';

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
    private auth:TempAuthService
  ) { }

  categories: any;
  productflag = true;
  CartProduct: any[] = [];

  page: number = this.productservice.page;
  limit: number = this.productservice.limit;
  sort: string = this.productservice.sort;

  productSelectedPrice: { [productId: string]: number } = {};
  disablecart = ():boolean => CartService.disablecart;

  static FireOnce: boolean = true;
  ngOnInit() {
    this.productservice.limit = 30;
    this.productservice.page = 1;
    this.productservice.sort = 'Recommended';

    this.RenderGetProducts(this.page);
  }

  RenderGetProducts(page:number): void {

    const categoryId = this.rout.snapshot.paramMap.get('id');

    /* if the limit change make the page to 1 because it will skip products with diffrent limit */
    if (this.productservice.limit !== this.limit) {
      this.productservice.page = 1;
      this.page = 1;
    } else {
      this.productservice.page = page;
      /* make the page here is the same page that send by the child pagination */
      this.page = page
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
    if (this.cartservice.Lodingcart ) return;
      CartService.disablecart = true;
      p.incart = !p.incart;
      this.cartservice.addToCart({ Product: p,Quantity: this.productSelectedPrice[p._id] || 1 });
  }
  
  RemoveFromCart(p: any) {
    if (this.cartservice.Lodingcart) return;
    CartService.disablecart = true;
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
  }

  isproductinCart = (ssss: boolean): boolean => ssss;

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }


  public createRange(number: number): number[] {
    return new Array(+number).fill(0).map((n, index) => index + 1);
  }
  localProductProgress = () => this.productservice.Lodingproduct;

  /* Temperory till user service is implemented */
  public IsLogged =(): boolean=>  this.auth.IsLogged();
}