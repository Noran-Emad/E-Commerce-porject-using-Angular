import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../admin-auth/admin-auth.component';
import { Router } from '@angular/router';
import { AdminServicesService } from '../services/admin-service';
// import { stringify } from 'querystring';

@Component({
  selector: 'app-productdetails',
  templateUrl: './product.details.component.html',
  styleUrl: './product.details.component.css'
})
export class productdetailsComponent implements OnInit {

constructor(private _auth:AdminServicesService,private _router:Router) {
  
}

  productForm:FormGroup = new FormGroup({


    name:new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    price:new FormControl(null,[Validators.required]),
    category:new FormControl(null,[Validators.required]),
    colors:new FormControl(null,[Validators.required]),
    quantity: new FormControl(null,[Validators.required]),
    // images:new FormControl(null,[Validators.required])
    images:new FormControl(null,[Validators.required])



  })


  categoris:any[]=[];
  ngOnInit(): void {
    this._auth.getCategories().subscribe({
      next:(response)=>{
        this.categoris=response.data.Categories;
        // console.log(response);
        console.log(this.categoris);

      }
      ,
      error:(error)=>{
        console.log(error);

      }
    })



    
  }
  isloadind:boolean=false;

  submitAddForm(productForm:FormGroup){
        this.isloadind=true;

    const formData = new FormData();
  formData.append('name', productForm.value.name);
  formData.append('description', productForm.value.description);
  formData.append('price', productForm.value.price);
  formData.append('category', productForm.value.category);
  formData.append('colors', productForm.value.colors);
  formData.append('quantity', productForm.value.quantity);
  // Append the selected file(s) to the FormData object
  // formData.append('images', productForm.value.images[0]);

  const fileInput=<HTMLInputElement>document.getElementById('fileInput');
  if(fileInput.files && fileInput.files.length>0){
    formData.append('images',fileInput.files[0]);

  }

  this._auth.addproduct(formData).subscribe({
    next: (response) => {
      console.log(response.data);
      localStorage.setItem('ProductName', productForm.value.name);
      // Handle other localStorage items
      this._router.navigate(['/about']);
      localStorage.setItem('ProductName',productForm.value.name);
    localStorage.setItem('desctiption',productForm.value.description);
    localStorage.setItem('price',productForm.value.price);
    localStorage.setItem('quantity',productForm.value.quantity);
    localStorage.setItem('colors',productForm.value.colors);
    localStorage.setItem('categoty',productForm.value.category);
    localStorage.setItem('images',productForm.value.images);
    },
    error: (e) => {
      this.isloadind = false;
      console.log(e);
    }

    
  });
  }}
    
      

   
  
  


