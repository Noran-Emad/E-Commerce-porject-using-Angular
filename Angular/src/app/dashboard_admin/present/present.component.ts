import { Component, OnInit } from '@angular/core';
import {AdminServicesService } from '../services/admin-service';
import { Router } from '@angular/router';
import { response } from 'express';
import { NavigationExtras } from '@angular/router';
import { strict } from 'assert';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrl: './present.component.css'
})
export class PresentComponent implements OnInit {


  constructor(private _movieService:AdminServicesService,private _router:Router){

  }

  termControl: FormControl = new FormControl('');
  filteredProducts: any[] = [];

  AllProductsForAdmin:any[]=[];

goToAddProduct(){
  this._router.navigate([`/addform`]);
}
  ngOnInit(): void {
    
    this._movieService.getAllProducts().subscribe({

      next:(response)=>{this.AllProductsForAdmin=response.data.products;
        this.searchProducts(' ');
        console.log(response);
        this.termControl.valueChanges.subscribe((value: string) => {
          this.searchProducts(value);
        });
      
      console.log(response),
    console.log(this.AllProductsForAdmin);},
      error:()=>{}
    })
    

   
  }

  Del(id:string,event:any){
    Swal.fire({
      text:"Are You Sure You Want To Delete It",
      showCancelButton:true,
      confirmButtonText:"yes , Delete It",
      cancelButtonText:"No Cancel",
      reverseButtons:true
    }).then((res)=>{
      if(res.isConfirmed){
        this._movieService.DeleteProduct(id).subscribe({
          next:(res)=>{
            console.log(res);
            const Tr=event.target.closest('tr');
            if(Tr){
              Tr.remove();
            }    
          }
        })

      }
    })
 
  }
  searchProducts(term: string): void {
    if (!term.trim()) {
      // If search term is empty, show all products
      this.filteredProducts = this.AllProductsForAdmin;
    } else {
      // Filter products based on search term
      this.filteredProducts = this.AllProductsForAdmin.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    }
  }
  

}
