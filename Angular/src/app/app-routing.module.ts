import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products/:id', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'payment/:id', component: PaymentComponent }
    ]
  },
  // {path: 'admin',component: AdminDashboardComponent,
  // children: [
  //   // { path: 'products', component: /* admin product component */ }
  // ]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
