import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

// import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './cart/order/order.component';
/**
 * Created by constie on 08.05.2017.
 */
const appRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'book/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent},
  { path: 'order/:id/:total', component: OrderComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
