import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { ErrorComponent } from '../components/error/error.component';
import { ProductService } from './product.service';
import { TempAuthService } from './temp-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient,private productservice:ProductService,public auth:TempAuthService) { }
  Lodingreview :boolean = false;
  headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
  reviewsSubject = new BehaviorSubject<any>(null);
  productreviewsdata$:Observable<any> = this.reviewsSubject.asObservable();

  public IsLogged(): boolean {
    return localStorage.getItem('jwt') != null;
  }

  GetProductReviews(prodid:string,page:number){
    let reviewsURL = `http://localhost:3000/api/Review/reviews/${prodid}?page=${page}`;

    this.http.get<any>(reviewsURL,{headers:this.headers}).pipe(take(1)).subscribe((reviws: any) => {
        this.reviewsSubject.next(reviws);
        this.Lodingreview = false;
      },
      (error) => {
        ErrorComponent.ShowMessage(error.error)
        this.Lodingreview = false;
      });
    }
    
    
    DeleteReview(prodid:string){
    let reviewsURL = `http://localhost:3000/api/Review/reviews/${prodid}`;

    this.http.delete<any>(reviewsURL,{headers:this.headers}).subscribe(() => {
      this.productservice.GetaProduct(prodid)
      this.GetProductReviews(prodid,1)
      this.Lodingreview = false;

    },(error) =>
    {
      ErrorComponent.ShowMessage(error.error)
      this.Lodingreview = false;
    });
  }


  SubmitReview(rate: number, title: string, id: string) {
    if (this.auth.IsLogged()) {
      const AddReviewURL = `http://localhost:3000/api/Review/reviews/${id}`;
      const headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });
  
        this.http.post(AddReviewURL, { "Title": title,"Rating": rate }, { headers: headers }).subscribe((myx:any) => {
          let old = this.reviewsSubject.getValue();
          old.UserReviewexiest = myx;
          this.reviewsSubject.next(old)
          this.Lodingreview = false;

          this.productservice.GetaProduct(id)
          this.GetProductReviews(id,1)

        }, error => {
          ErrorComponent.ShowMessage(error.error);
          this.Lodingreview = false;
        });
    } else {
      ErrorComponent.ShowMessage('You need to login first');
    }
  }
  
}