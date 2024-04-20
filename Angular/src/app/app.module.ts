import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';

import { CategoryComponent } from './components/category/category.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ErrorComponent } from './components/error/error.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthInterceptor } from './authinterceptor.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { LoginComponent } from './components/login/login.component';
// import { ProductComponent } from './admin-dashboard/product/product/product.component';
// import { AddproductComponent } from './admin-dashboard/addproduct/addproduct/addproduct.component';
// import { PendingorderComponent } from './admin-dashboard/pendingorder/pendingorder/pendingorder.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminSidebarComponent } from './admin/components/admin-sidebar/admin-sidebar.component';
import { EditProductComponent } from './admin/components/edit-product/edit-product.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminProductItemComponent } from './admin/components/admin-product-item/admin-product-item.component';
import { AdminProductsPageComponent } from './admin/components/admin-products-page/admin-products-page.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';



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
    ProductItemComponent,
    PaginationComponent,
    ErrorComponent,
    PaymentComponent,
    DefaultLayoutComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    EditProductComponent,
    AdminProductsComponent,
    AdminProductItemComponent,
    AdminProductsPageComponent,
    AdminOrdersComponent
    // ProductComponent,
    // AddproductComponent,
    // PendingorderComponent,
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
