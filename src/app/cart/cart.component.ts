import { Component, OnInit } from '@angular/core';

import { CartService } from './cart.service';
import { CartItem } from "./cartitem.model";
import { Product } from "../products/products.model";
import _ from "lodash";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  vm = this;
  orderId: number;
  cartItems: CartItem[];
  selectedProducts: Product[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.selectedProducts = this.cartService.selectedProducts;
  }

  makeOrder(){
    let totalAmount: number = 0;
    for(let i=0; i<this.cartItems.length; i++){
      for(let j=0; j<this.selectedProducts.length; j++){
        if(this.cartItems[i].productId === this.selectedProducts[j].id){
          totalAmount += this.cartItems[i].amount * this.selectedProducts[j].price;
          break;
        }
      }
    }

    console.log('totalAmount: ', totalAmount);

    this.cartService.makeOrder(totalAmount).subscribe(
      (response) => this.orderId = response.id,
      (error) => console.log('error: ', error)
    )
  }

}
