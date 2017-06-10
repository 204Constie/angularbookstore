import { Component, OnInit } from '@angular/core';
import { CartService } from "../cart.service";
import { ActivatedRoute, Router } from '@angular/router';

import { CartItem } from '../cartitem.model';
import { Product } from '../../products/products.model';
import { OrderService } from './order.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderId: number;
  cartItems: CartItem[];
  selectedProducts: Product[];
  totalAmount: number;
  order = {
    payment: '',
    shipment: ''
  };

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.selectedProducts = this.cartService.selectedProducts;
    this.route.params.subscribe(
      params => {
        this.orderId = Number(params['id']);
        this.totalAmount = Number(params['total']);
      }
    )
  }

  placeOrder(){
    console.log('p: ', typeof this.orderId, ' k: ', typeof this.totalAmount);
    this.orderService.sendOrder(this.orderId, this.totalAmount, this.order.shipment, this.order.payment).subscribe();

    for(let item of this.cartItems){
      this.orderService.sendCartItem(item.productId, this.orderId, Number(item.amount)).subscribe(
        (response) => console.log(response),
        (error) => console.log('error in posrting cart item'),
        () => this.cartService.removeCartItem(item)
      );
    }

    //navigate to main and clear selectedProducts and cartItems from cartService
    this.cartService.clearProducts();
    this.router.navigate(['']);
  }

}
