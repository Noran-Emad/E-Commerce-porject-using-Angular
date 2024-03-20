import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService,private cartservice:CartService) { }
  categoryId: any;
  category: any;
  products: any;
  TotalPages: number = 1;


  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.productService.limit = 30;
    this.productService.page = 1;
    this.productService.sort = 'Recommended';
  }

  GetProducts(id: any): void {
    this.productService.GetCategpryProducts(this.categoryId);
    this.cartservice.GetCart();
    this.cartservice.cartData$.subscribe((cart)=>{

      this.productService.CategoryProductData$.subscribe((data) => {
        
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
}