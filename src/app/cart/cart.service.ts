/**
 * Created by constie on 28.05.2017.
 */

import {Injectable, Inject} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { CartItem } from './cartitem.model';
import { Order } from './order.model';
import { Product } from '../products/products.model';

@Injectable()
export class CartService {
  cartItems: CartItem[] = [];
  selectedProducts: Product[] = [];

  placeOrderUrl: 'localhost:9000/orders';

  constructor(private http: Http){}

  addCartItem(productId: number, amount: number){
    let c = new CartItem();
    c.amount = amount;
    c.productId = productId;
    c.orderId = 0;
    this.cartItems.push(c)
  }

  addProductToCart(product){
    this.selectedProducts.push(product);
  }

  makeOrder(){
    return this.http.post(this.placeOrderUrl, {"totalAmount": 0}).map(
        (response: Response) => response.json(),
        (error: Response) => console.log('error at making new order')
      )
  }

}
