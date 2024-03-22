import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {

  constructor(private productservice: ProductService, private cartservice: CartService, private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.router.events.subscribe((even: any) => {
      if (even instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }

  private scrollToTop(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  id = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
  product: any;
  reviews: any;
  AvgRate: number = 0;
  outQuantity: any = 1;

  isProductinCart: boolean = false;

  inQuantity: any;

  ngOnInit() {
    this.GetProduct()
  }

  GetProduct() {
    if (this.productservice.Lodingproduct) return;
    this.productservice.Lodingproduct = true;
    this.productservice.GetaProduct(this.id);
    this.cartservice.cartData$.subscribe((cartData: any[]) => {

      this.productservice?.aproductData$.subscribe((product) => {
        this.product = product?.product;
        this.reviews = product?.reviews;
        this.CalcAvgRate(product?.reviews)
        let exiest = cartData.filter(e => e.Product?._id === this.product?._id)[0];
        this.inQuantity = exiest?.Quantity;
        exiest ? this.isProductinCart = true : null
      })
    })

  }

  CalcAvgRate(revs: any[]) {
    let totalrate = 0;
    revs?.forEach((rev) => {
      totalrate += +rev?.Rating;
    })
    this.AvgRate = (+totalrate / +revs?.length);
  }

  AddToCart(p: any) {
    if (!localStorage.getItem('jwt')) {
      alert('You need to login first')
    } else {

      if (this.cartservice.isLoding()) return;
      this.cartservice.Lodingcart = true;
      p.incart = !p.incart;
      this.cartservice.addToCart({ Product: p, Quantity: this.outQuantity || 1 })
      this.isProductinCart = true;
    }
  }
  RemoveFromCart(p: any) {
    if (this.cartservice.isLoding()) return;
    this.cartservice.Lodingcart = true;
    p.incart = !p.incart;
    this.cartservice.removefromcart(p._id);
    this.isProductinCart = false;
  }

  public IsLogged(): boolean {
    return localStorage.getItem('jwt') != null;
  }

  UpdateQuantity(event: any, id: string) {
    if (this.cartservice.isLoding()) return;
    this.cartservice.Lodingcart = true;
    let selectedValue = event.target.value;
    this.cartservice.updateQtycart(selectedValue, id);
  }

  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  ReviewTitle: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedStarIndex: number = 2;
  selectedValue: number = 3;

  highlightStars(index: number): void {
    if (this.selectedStarIndex !== -1) {
      return;
    }
    this.selectedStarIndex = index;
  }

  selectStar(index: number): void {
    this.selectedStarIndex = index;
    this.selectedValue = index + 1;
  }

  SubmitReview() {

    if (this.IsLogged()) {
      let AddReviewURL = `http://localhost:3000/api/Review/reviews/${this.id}`
      let AddRateURL = `http://localhost:3000/api/Review/ratings/${this.id}`
      let headers = new HttpHeaders({ jwt: `${localStorage.getItem('jwt')}` });

      if (this.ReviewTitle.trim() === '') return alert('Review cant be empty');
      this.http.post(AddRateURL, { "Rating": this.selectedValue }, { headers: headers }).subscribe(() => {
        this.selectedValue = 3;
        this.selectedStarIndex = 2;
        this.GetProduct();
        this.http.post(AddReviewURL, { "Title": this.ReviewTitle }, { headers: headers }).subscribe(() => {
          this.ReviewTitle = '';
          this.GetProduct();
        });
      });
    } else {
      alert('You need to login first')
    }
  }
}