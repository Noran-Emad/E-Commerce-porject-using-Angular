import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  page: number = 1;
  limit: number = 30;
  sort: string = 'Recommended';


  private productsDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  productsData$: Observable<any> = this.productsDataSubject.asObservable();

  private TotalPagesDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  TotalPagesData$: Observable<any> = this.TotalPagesDataSubject.asObservable();


  private aproductDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  aproductData$: Observable<any> = this.aproductDataSubject.asObservable();

  private CategoryProductDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  CategoryProductData$: Observable<any> = this.CategoryProductDataSubject.asObservable();


  constructor(private http: HttpClient) {}

  getProducts(isok:boolean): void {
    // if (isok) {
      const ProductsURL = `http://localhost:3000/api/Products?limit=${this.limit}&page=${this.page}&sort=${this.sort}`;
      this.http.get<any[]>(ProductsURL).subscribe(
        (productsData:any) => {
          this.productsDataSubject.next(productsData.Products);
          this.TotalPagesDataSubject.next(productsData.TotalPages);
          HomeComponent.InProgress = false;
        },
        (error) => {
          console.error('Error fetching product data:', error);
        }
      );
    // }
  }


GetaProduct(id:string){
    const ProductURL = `http://localhost:3000/api/Products/${id}`;
    this.http.get<any>(ProductURL).subscribe(
      (productData:any) => {
        this.aproductDataSubject.next(productData);
        HomeComponent.InProgress = false;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
}


GetCategpryProducts(id:any): void{
  console.log('id in service GetCategpryProducts',id)
  let ProductsURL = `http://localhost:3000/api/Category/${id}?limit=${+this.limit}&page=${this.page}&sort=${this.sort}`;
  this.http.get<any[]>(ProductsURL).subscribe((productsData:any) => {
    this.CategoryProductDataSubject.next(productsData);
    HomeComponent.InProgress = false;
    },
    (error) => {
      console.error('Error fetching product data:', error);
    }
  );
}


}