import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  cartItemsAmount: number = 0;
  subscription: any;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    // this.cartItemsAmount = this.cartService.selectedProducts.length;
    this.subscription = this.cartService.listEmitter$.subscribe(
      selectedProductsLength => this.cartItemsAmount = selectedProductsLength
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showShoppingCart(){
    this.router.navigate(['cart']);
  }

}
