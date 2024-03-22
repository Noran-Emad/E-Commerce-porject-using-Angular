import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy {
  categories: any;
  constructor(private catgoryservice: CategoryService) { }
  categorySubscription?: Subscription;

  ngOnInit(): void {
    this.GetCategories();
  }

  GetCategories() {
    this.categorySubscription = this.catgoryservice.GetCategories()
      .subscribe((categoryData: any) => this.categories = categoryData);
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }
}
