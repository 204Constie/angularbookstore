import { Component, OnInit } from '@angular/core';

import { CartService } from './cart.service';
import { CartItem } from "./cartitem.model";
import { Product } from "../products/products.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderId: number;
  cartItems: CartItem[];
  selectedProducts: Product[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.selectedProducts = this.cartService.selectedProducts;
  }

  makeOrder(){
    this.cartService.makeOrder().subscribe(
      (response) => this.orderId = response.id,
      (error) => console.log('error: ', error)
    )
  }

}
