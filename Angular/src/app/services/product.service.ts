import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorComponent } from '../components/error/error.component';
import { CartService } from './cart.service';
import { error } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Lodingproduct: boolean = false;
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


  constructor(private http: HttpClient, private cartservice:CartService) { }

  getProducts(isok: boolean): void {
    if (isok) {
      const ProductsURL = `http://localhost:3000/api/Products?limit=${this.limit}&page=${this.page}&sort=${this.sort}`;
      this.http.get<any[]>(ProductsURL).subscribe((productsData: any) => {
        
        this.cartservice.cartData$.subscribe((cart:any)=>{
          productsData.Products.forEach((product: any) => {
            product.incart = cart.some((item:any) => item.Product._id === product._id);
          });

            this.productsDataSubject.next(productsData.Products);
            this.TotalPagesDataSubject.next(productsData.TotalPages);
            this.Lodingproduct = false;
          },
        error => {
            this.Lodingproduct = false;
            ErrorComponent.ShowMessage(error.error)
          }
          );
    },error=>{
      this.Lodingproduct = false;
      ErrorComponent.ShowMessage(error.error)
    })
    }
  }


  GetaProduct(id: string) {
    const ProductURL = `http://localhost:3000/api/Products/${id}`;
    this.http.get<any>(ProductURL).subscribe((productData: any) => {
        this.aproductDataSubject.next(productData);
        this.Lodingproduct = false;
      },
      (error) => {
        ErrorComponent.ShowMessage(error.error)
      }
    );
  }

  GetCategpryProducts(id: any): void {
    let ProductsURL = `http://localhost:3000/api/Category/${id}?limit=${+this.limit}&page=${this.page}&sort=${this.sort}`;
    this.http.get<any[]>(ProductsURL).subscribe((productsData: any) => {
      this.CategoryProductDataSubject.next(productsData);
      this.Lodingproduct = false;
    },
      (error) => {
        ErrorComponent.ShowMessage(error.error)
      }
    );
  }

}