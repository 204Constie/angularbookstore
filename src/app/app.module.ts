import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { AppRoutingModule } from './app-routing.module';

import { ProductsService } from './products/products.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { NavComponent } from './nav/nav.component';
import { OrderComponent } from './cart/order/order.component';
import { OrderService } from './cart/order/order.service';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    NavComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ProductsService,
    CartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
