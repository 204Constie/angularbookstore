/**
 * Created by constie on 10.06.2017.
 */
import {Injectable, Inject} from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';

@Injectable()
export class OrderService {

  constructor(private http: Http){}

  sendOrder(id: number, totalAmount: number, shipment: String, payment: String){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({"id": id, "totalAmount": totalAmount, "shipment": shipment, "payment": payment})
    return this.http.post('http://localhost:9000/orders/update', data, options).map(
      (response: Response) => response.json(),
      (error: Response) => console.log('error at making new order')
    )
  }

  sendCartItem(productId: number, orderId: number, amount: number, typename: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({"productId": productId, "orderId": orderId, "amount": amount, "typename": typename})
    return this.http.post('http://localhost:9000/cartitems', data, options).map(
      (response: Response) => response.json(),
      (error: Response) => console.log('error at making new order')
    )
  }

}
