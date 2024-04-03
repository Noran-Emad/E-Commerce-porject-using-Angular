import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { holdReady } from 'jquery';

const routes: Routes = [
      {path:'',component:HomeComponent ,children:[
      {path:'products/:id',component:ProductsComponent },
      {path:'cart',component:CartComponent},
      {path:'category/:id',component:CategoryComponent},
      {path:'orders',component:OrderComponent},
      {path:'payment/:id',component:PaymentComponent},
    ]},
  
    { path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: 'products', component: HomeComponent },
      { path: 'orders', component: CartComponent }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
