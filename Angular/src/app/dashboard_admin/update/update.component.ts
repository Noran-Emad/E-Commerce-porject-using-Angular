import { Component, OnInit } from '@angular/core';
import { AdminServicesService } from '../services/admin-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
itemDetails2:any;
productData:any;

img:any;
Id:any;
  constructor(private _auth:AdminServicesService, private route:ActivatedRoute,private _router:Router) {
    let {id}= this.route.snapshot.params;
    this.Id=id;
    this._auth.getProductById(id).subscribe({
     next:(res)=>{
       this.itemDetails2=res.data.product;
       console.log(res.data.product);
       this.productForm.patchValue({
        name:this.itemDetails2.name,
        category:this.itemDetails2.category,
        colors:this.itemDetails2.colors
      })
      this.img=this.itemDetails2.images[0];
     }
    }); 
  }

  productForm:FormGroup=new FormGroup({
    name:new FormControl(null),
    category:new FormControl(null),
    colors:new FormControl(null),
    images:new FormControl(null,[Validators.required])
})

submitupdateForm(productForm:FormGroup){
  this.isloadind=true;
const formData = new FormData();
formData.append('name', productForm.value.name);
  formData.append('category', productForm.value.category);
  formData.append('colors', productForm.value.colors);
  const fileInput =<HTMLInputElement>document.getElementById('fileInput');
  if(fileInput.files && fileInput.files.length>0){
    formData.append('images',fileInput.files[0]);
  }

  this._auth.updateProduct(this.Id,formData).subscribe({
    next:(response)=>{
      console.log(response);
      this._router.navigate(['/about']);
    }
  })
}
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
}
