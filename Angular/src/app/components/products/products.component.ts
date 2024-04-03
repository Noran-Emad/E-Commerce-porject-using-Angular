import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ReviewService } from '../../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private productservice: ProductService, private reviewsservice: ReviewService, private cartservice: CartService, private route: ActivatedRoute, private router: Router) {
  }

  localProductProgress = () => this.productservice.Lodingproduct;
  localReviewProgress = () => this.reviewsservice.Lodingreview;


    myForm: FormGroup = this.formbuilder.group({
      title: ['', Validators.required],
    });;

  id = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
  product: any;
  reviews: any;
  AvgRate: number = 0;
  outQuantity: any = 1;
  isUserReviewd: any = null;
  
  TotalPages: number = 1;
  page: number = 1;


  ReviewTitle: string = '';
  stars: number[] = this.createRange(5);
  selectedStarIndex: number = 2;
  selectedValue: number = 3;
  
  isProductinCart: boolean = false;
  disablecart = (): boolean => CartService.disablecart;
  
  inQuantity: any;

 ngOnInit() {
   this.GetProduct()
   window.scrollTo({top: 0,behavior: 'instant'})
}

  GetProduct() {
    if (this.productservice.Lodingproduct) return;
    this.productservice.Lodingproduct = true;
    let isReviewCalled = true;

    this.selectedValue = 3;
    this.selectedStarIndex = 2;
    this.ReviewTitle = '';

    this.id && this.productservice.GetaProduct(this.id);
    /* Get The Product */
    this.productservice?.aproductData$.subscribe((product) => {
      this.product = product;
      this.AvgRate = product?.rate

      /* Get Reviews only one time if the rev subject is null */
      if (isReviewCalled)
      this.getReviws(this.page)
      isReviewCalled = false;

      /* check if product in cart */
      this.cartservice.cartData$.subscribe((cartData: any[]) => {
        this.IfThisProductInCart(cartData, product?._id);
       })
    })
  }


  getReviws(page: number) {
    this.reviewsservice.Lodingreview = true;
    this.reviewsservice.GetProductReviews(this.id, page);
    this.page = page || 1;
    this.reviewsservice.productreviewsdata$.subscribe((reviws) => this.AssignLocalReviews(reviws))
  }


  SubmitReview = () => {
  if (!this.myForm.controls['title'].valid) return;
  this.reviewsservice.Lodingreview = false;
  this.reviewsservice.SubmitReview(this.selectedValue, this.ReviewTitle, this.id);
  this.page = 1;
}

DeleteReview(productid: string) {
  this.reviewsservice.Lodingreview = false;
  this.reviewsservice.DeleteReview(productid);
  this.page = 1;
  this.isUserReviewd= null;
  }


  /* assign the total pages and reviews and if this user has aleady a review before */
  AssignLocalReviews(reviws: any) {
    this.reviews = reviws?.reviews;
    this.isUserReviewd = reviws?.UserReviewexiest?.[0];
    this.TotalPages = reviws?.totalPages;

    this.reviews?.forEach((rev: any) => rev.userreviwed = reviws?.UserReviewexiest[0]?._id === rev?._id);

    this.ReviewTitle = reviws?.UserReviewexiest[0]?.Title
    this.selectedValue = reviws?.UserReviewexiest[0]?.Rating
    this.selectedStarIndex = reviws?.UserReviewexiest[0]?.Rating - 1
  }


  /* if this product is in your cart adjust the quantity and add/remove button */
  IfThisProductInCart(cart: any, prodid: string) {
    let exiest = cart.filter((e: any) => e.Product?._id === prodid)[0];
    this.inQuantity = exiest?.Quantity;
    this.isProductinCart = exiest ?  true:false;
  }


  GotoPage(Pnum: number): void {
    if (Pnum <= this.TotalPages && Pnum > 0) {
      this.page = Pnum;
    } else if (Pnum >= this.TotalPages) {
      this.page = this.TotalPages;
    } else {
      this.page = 1;
    }
    this.getReviws(this.page);
  }


  AddToCart(p: any) {
      CartService.disablecart = true;
      p.incart = !p.incart;
      this.cartservice.addToCart({ Product: p, Quantity: this.outQuantity || 1 })
      this.isProductinCart = true;
  }
  RemoveFromCart(p: any) {
    CartService.disablecart = true;
    p.incart = !p.incart;
    this.cartservice.removefromcart(p._id);
    this.isProductinCart = false;
  }

  public IsLogged(): boolean {
    return localStorage.getItem('jwt') != null;
  }

  UpdateQuantity(event: any, id: string) {
    CartService.disablecart = true;
    let selectedValue = event.target.value;
    this.cartservice.updateQtycart(selectedValue, id);
  }

  public createRange(number: number): number[] {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }


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
}