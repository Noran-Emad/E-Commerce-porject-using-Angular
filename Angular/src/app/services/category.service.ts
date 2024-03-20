import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  headers = new HttpHeaders({'jwt': `${localStorage.getItem('jwt')}`});
  constructor(private http: HttpClient) {}
  categories:any;

  GetCategories(): Observable<any> {
    let CategoryURL = 'http://localhost:3000/api/category';
    if (!this.categories) {
      return this.http.get(CategoryURL, { headers: this.headers }).pipe(
        tap((CategoryData) => {
          this.categories = CategoryData;
        })
      );
    } else {
      return of(this.categories);
    }
  }
}
