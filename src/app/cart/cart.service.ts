/**
 * Created by constie on 28.05.2017.
 */

import {Injectable, Inject} from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

import { CartItem } from './cartitem.model';
import { Order } from './order.model';
import { Product } from '../products/products.model';

@Injectable()
export class CartService {
  cartItems: CartItem[] = [];
  selectedProducts: Product[] = [];
  listEmitter$: Observable<number>;
  _observer: Observer<any>;

  constructor(private http: Http){
    this.listEmitter$ = new Observable(observer => this._observer = observer).share();
  }

  addCartItem(productId: number, amount: number){
    if(!this.cartItems.find(item => item.productId === productId)){
      let c = new CartItem();
      c.amount = amount;
      c.productId = productId;
      c.orderId = 0;
      this.cartItems.push(c);
    } else {
      console.log(`product of id: already added to cart`)
    }
  }
  removeCartItem(item){
    let idx = this.cartItems.indexOf(item);
    this.cartItems.splice(idx, 1);
  }

  addProductToCart(product){
    if(this.selectedProducts.indexOf(product) === -1){
      this.selectedProducts.push(product);
      this._observer.next(this.selectedProducts.length);
    } else {
      console.log(`product already added to cart`)
    }
  }
  removeSelectedProduct(product){
    let idx = this.selectedProducts.indexOf(product);
    this.selectedProducts.splice(idx, 1);
    this._observer.next(this.selectedProducts.length);
  }



  makeOrder(totalAmount: number, shipment: String, payment: String){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({"totalAmount": totalAmount, "shipment": shipment, "payment": payment})
    return this.http.post('http://localhost:9000/orders', data, options).map(
        (response: Response) => response.json(),
        (error: Response) => console.log('error at making new order')
      )
  }

  clearProducts(){
    this.selectedProducts = [];
    this._observer.next(this.selectedProducts.length);
  }


}
