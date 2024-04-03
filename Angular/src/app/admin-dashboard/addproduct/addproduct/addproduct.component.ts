import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AdminServicesService } from '../../services/admin-service';
import { Iproduct } from '../../../components/products/model';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  response: any;
  productForm: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddproductComponent>,
    private adminService: AdminServicesService,
    @Inject(MAT_DIALOG_DATA) public updateProduct: Iproduct
  ){
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z\s\.]*$/),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['Category', [Validators.required]],
      brand: ['', [Validators.required, Validators.minLength(2)]],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i),
        ],
      ],
      price: ['', [Validators.required]],
      countInStock: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.updateProduct) {
      this.productForm.get('name')?.setValue(this.updateProduct.name);
      this.productForm.get('brand')?.setValue(this.updateProduct.brand);
      this.productForm.get('price')?.setValue(this.updateProduct.price);
      this.productForm.get('countInStock')?.setValue(this.updateProduct.productQuantity);
      this.productForm.get('category')?.setValue(this.updateProduct.category);
      this.productForm.get('description')?.setValue(this.updateProduct.description);
      this.productForm.get('image')?.setValue(this.updateProduct.image);
      this.actionBtn = 'Update';
    }
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get category() {
    return this.productForm.get('category');
  }
  get brand() {
    return this.productForm.get('brand');
  }

  get image() {
    return this.productForm.get('image');
  }
  get price() {
    return this.productForm.get('price');
  }
  get countInStock() {
    return this.productForm.get('productQuantity');
  }

  submitForm() {
    let image = this.productForm.get('image')?.value.substring(12);

    const { name, description, price, productQuantity, brand, category } =
      this.productForm.value;

    if (this.actionBtn === 'Save') {
      this.adminService
        .addProduct({
          name,
          description,
          price,
          brand,
          category,
          image,
         productQuantity
        })
        .subscribe(
          () => {
            this.productForm.reset();
            this.dialogRef.close(true);
          },
          (err) => {
            alert(JSON.stringify(err.error.message));
          }
        );
    } else {
      const productId = this.updateProduct?._id ?? ''; 
      this.adminService
        .updateProduct(this.productForm.value,productId)
        .subscribe(
          () => {
            this.productForm.reset();
            alert('update successful');
            this.dialogRef.close(true);
          },
          (err) => {
            alert(JSON.stringify(' failed in update'));
          }
        );
    }
  }
  close() {
    this.dialogRef.close(true);
  }
}


