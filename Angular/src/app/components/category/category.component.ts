import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private cartservice: CartService, @Inject(DOCUMENT) private document: Document) {
    this.router.events.subscribe((even: any) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
        this.GetProducts(this.categoryId)
      }
    });
  }

  categoryId: any;
  category: any;
  products: any;
  TotalPages: number = 1;

  cartSubscription?: Subscription;
  productsSubscription?: Subscription;

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.productService.limit = 30;
    this.productService.page = 1;
    this.productService.sort = 'Recommended';
  }

  GetProducts(id: any): void {
    if (this.productService.Lodingproduct) return;
    this.productService.Lodingproduct = true;

    this.productService.GetCategpryProducts(this.categoryId);
    this.cartSubscription = this.cartservice.cartData$.subscribe((cart) => {

      this.productsSubscription = this.productService.CategoryProductData$.subscribe((data) => {

        this.category = data?.Category;
        this.products = data?.Products;

        this.products?.forEach((product: any) => {
          let exists = cart.some((item) => item.Product._id === product._id);
          product.incart = exists;
        });

        this.TotalPages = data?.TotalPages;
      });
    })
  }
  
  private scrollToTop(): void {
    this.document.body.scrollTop = 0; // For Safari
    this.document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }

  ngOnDestroy(): void {
    this.productService.limit = 30;
    this.productService.page = 1;
    this.productService.sort = 'Recommended';

    this.productsSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }

}