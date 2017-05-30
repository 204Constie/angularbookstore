/**
 * Created by constie on 08.05.2017.
 */


import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// import 'rxjs/add/operator/toPromise';

import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private books: Product[];
  private book: Product;
  private getProductsUrl: string = 'http://localhost:9000/products';
  private getProductUrl: string = 'http://localhost:9000/product/';

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) { }

  getProducts(){
    return this.http.get(this.getProductsUrl).map(
      (response: Response) => {
        return this.books = response.json();
      }
    )
    .catch(
      (error: Response) => {
        return Observable.throw('couldn\'t get products');
      }
    );
  }

  getProduct(id: number){
    return this.http.get(this.getProductUrl + '' + id).map(
      (response: Response) => {
        return this.book = response.json();
      }
    )
    .catch(
      (error: Response) => {
        return Observable.throw('couldn\'t get product');
      }
    );
  }



}
