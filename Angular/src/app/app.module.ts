import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { LodingComponent } from './components/loding/loding.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ErrorComponent } from './components/error/error.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthInterceptor } from './authinterceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    OrderComponent,
    ProductsComponent,
    NavbarComponent,
    FooterComponent,
    CategoryComponent,
    LodingComponent,
    ProductItemComponent,
    PaginationComponent,
    ErrorComponent,
    PaymentComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
