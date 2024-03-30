import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  cartSubscription?: Subscription;
  categorySubscription?: Subscription;
  productsSubscription?: Subscription;

  localCartProgress = () => this.cartservice.isLoding();

  constructor(
    private productservice: ProductService,
    private cartservice: CartService,
    private categoryservice: CategoryService
  ) { }

  categories: any;
  products: any[] = [];
  TotalPages: number = 1;
  CartProduct: any[] = [];

  page: number = this.productservice.page;
  limit: number = this.productservice.limit;
  sort: string = this.productservice.sort;

  productSelectedPrice: { [productId: string]: number } = {};

  static FireOnce: boolean = true;
  ngOnInit() {
    // this.GetProducts(5, HomeComponent.FireOnce);
    HomeComponent.FireOnce = false;
    this.productservice.limit = 30;
    this.productservice.page = 1;
    this.productservice.sort = 'Recommended';
    this.GetCategories();
    window.scrollTo({top: 0,behavior: 'instant'})
  }


  GetProducts(id: any, isok: boolean): void {
    if (this.productservice.Lodingproduct) return;
    this.productservice.Lodingproduct = true;
    

    this.page= this.productservice.page;
    this.limit = this.productservice.limit;
    this.sort = this.productservice.sort;




    this.categoryservice.GetCategories();
    this.productservice.getProducts(isok);
    
    this.cartservice.cartData$.subscribe((cartData) => {

      this.productservice.productsData$.subscribe((productsData) => {
        
        this.products?.forEach((product: any) => {
          let exists = cartData.some((item) => item.Product._id === product._id);
          product.incart = exists;
        });
        this.products = productsData;
      });
      this.productservice.TotalPagesData$.subscribe((total) => this.TotalPages = total)
    });
  }

  GetCategories() {
    this.categorySubscription = this.categoryservice.GetCategories()
      .subscribe((categoryData: any) => this.categories = categoryData);
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
    this.productsSubscription?.unsubscribe();

    this.productservice.limit = 30;
    this.productservice.page = 1;
    this.productservice.sort = 'Recommended';
  }

  itemsPerSlide: number = this.calculateItemsPerSlide();

  calculateItemsPerSlide(): any {
    const breakpoints = { 522: 2, 700: 3, 900: 4, 1207: 5, 1400: 6, 2000: 7 };
    const screenWidth = window.innerWidth;
    return Object.values(breakpoints).find((value, index, array) => screenWidth < +Object.keys(breakpoints)[index] || index === array?.length - 1);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.itemsPerSlide = this.calculateItemsPerSlide();
  }
  chunks(arr: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(arr?.length / size) }, (_, i) =>
      arr?.slice(i * size, i * size + size)
    );
  }
}