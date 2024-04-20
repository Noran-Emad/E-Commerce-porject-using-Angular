import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminProductsPageComponent } from './admin/components/admin-products-page/admin-products-page.component';
import { EditProductComponent } from './admin/components/edit-product/edit-product.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
//import {NavebarComponent} from './dashboard_admin/navebar/navebar.component'
import { product } from './dashboard_admin/product/product.component';
import {PresentComponent  } from './dashboard_admin/present/present.component';
import { UpdateComponent } from './dashboard_admin/update/update.component';
import { productdetailsComponent } from './dashboard_admin/product.details/product.details.component';
const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products/:id', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'orders', component: OrderComponent, canActivate: [authGuard] },
      { path: 'payment/:id', component: PaymentComponent, canActivate: [authGuard] }
    ]
  },
  {path: 'admin',component: AdminDashboardComponent,
  children: [
    { path: 'products', component:  AdminProductsPageComponent  },
    { path: 'orders', component:  AdminOrdersComponent  },
    { path: 'products/add', component:  AddProductComponent  },
    { path: 'products/edit', component:  EditProductComponent  },
  ]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {path:"addform",component:productdetailsComponent},
  {path:"about",component:PresentComponent},
  {path:"people",component:product},
  {path:"update/:id",component:UpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
