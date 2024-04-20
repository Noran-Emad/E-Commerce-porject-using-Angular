import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from '../services/admin-service';
import { FormControl } from '@angular/forms';
import { BlockList } from 'net';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class product implements OnInit {
  termControl: FormControl = new FormControl('');
  filteredProducts: any[] = [];
  Allcategories:any[]=[];
  allproducts:any[]=[];
  


 
  constructor(private _productService:AdminServicesService) {
   
    
  }

  flage:boolean=false;
 term:string='';

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next:(response)=>{
        this.allproducts=response.data.products.splice(0,8);
        this.searchProducts(' ');
        console.log(response);
        console.log(this.allproducts);
        this.termControl.valueChanges.subscribe((value: string) => {
          this.searchProducts(value);
        });

      }
      ,
      error:(error)=>{
        console.log(error);

      }
    })
    this._productService.getCategories().subscribe({
      next:(response)=>{
        this.Allcategories=response.data.Categories;
        // console.log(response);
        console.log(this.Allcategories);

      }
      ,
      error:(error)=>{
        console.log(error);

      }
    })



    
  }
  searchProducts(term: string): void {
    if (!term.trim()) {
      // If search term is empty, show all products
      this.filteredProducts = this.allproducts;
    } else {
      // Filter products based on search term
      this.filteredProducts = this.allproducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    }
  }
}
