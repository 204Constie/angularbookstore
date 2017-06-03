/**
 * Created by constie on 28.05.2017.
 */

import {Injectable, Inject} from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { CartItem } from './cartitem.model';
import { Order } from './order.model';
import { Product } from '../products/products.model';

@Injectable()
export class CartService {
  cartItems: CartItem[] = [];
  selectedProducts: Product[] = [];


  constructor(private http: Http){}

  addCartItem(productId: number, amount: number){
    let c = new CartItem();
    c.amount = amount;
    c.productId = productId;
    c.orderId = 0;
    this.cartItems.push(c);
  }

  addProductToCart(product){
    this.selectedProducts.push(product);
  }

  makeOrder(totalAmount: number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({"totalAmount": totalAmount})
    return this.http.post('http://localhost:9000/orders', data, options).map(
        (response: Response) => response.json(),
        (error: Response) => console.log('error at making new order')
      )
  }

}
