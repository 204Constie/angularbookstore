import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './cart.service';
import { CartItem } from "./cartitem.model";
import { Product } from "../products/products.model";
import * as _ from "lodash";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderId: number;
  cartItems: CartItem[];
  selectedProducts: Product[];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.selectedProducts = this.cartService.selectedProducts;
    this.calculateTotalAmount();
  }

  calculateTotalAmount(){
    this.totalAmount = 0;
    for(let i=0; i<this.cartItems.length; i++){
      for(let j=0; j<this.selectedProducts.length; j++){
        if(this.cartItems[i].productId === this.selectedProducts[j].id){
          this.totalAmount += this.cartItems[i].amount * this.selectedProducts[j].price;
          break;
        }
      }
    }
  }

  removeCartItem(item, product){
    this.cartService.removeCartItem(item);
    this.cartItems = this.cartService.cartItems;
    if(!this.cartItems.find(item => item.productId === product.id)){
      this.removeSelectedProduct(product);
    }
  }
  removeSelectedProduct(product){
    this.cartService.removeSelectedProduct(product);
    this.selectedProducts = this.cartService.selectedProducts;
  }

  makeOrder(){

    this.cartService.makeOrder(this.totalAmount, 'inpost', 'card').subscribe(
      (response) => this.orderId = response.id,
      (error) => console.log('error: ', error),
      () => this.router.navigate(['order', this.orderId, this.totalAmount])
    )

  }

  navigateBack(){
    this.router.navigate(['']);
  }

}
