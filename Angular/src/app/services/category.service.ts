import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  private categoriesSubject = new BehaviorSubject<any>(null);
  public categoryloding:boolean = false;


  GetCategories(): Observable<any> {
    let CategoryURL = 'http://localhost:3000/api/category';
    if (!this.categoryloding) {
      /* if it's first time to get the categories data get it and make the condition false to get only once */
      this.categoryloding = true;
       this.http.get(CategoryURL).subscribe((CategoryData) => {
         this.categoriesSubject.next(CategoryData)
        });
      }
      return this.categoriesSubject.asObservable();
  }
}
