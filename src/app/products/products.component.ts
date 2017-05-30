import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { Router } from '@angular/router';

import { ProductsService } from './products.service';
import { Product } from './products.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private books: Product[];

  constructor(private productsService: ProductsService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    this.productsService.getProducts().subscribe(
      (response: Product[]) => {
        this.books = response;
      },
      (error: Response) => console.log('couldn\'t get products')
    );
  };

  showBook(id: number){
    console.log('id: ', id);
    this.router.navigate(['book', id]);
  };

  showShoppingCart(){
    this.router.navigate(['cart']);
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product);
    this.cartService.addCartItem(product.id, 1);
  }

}
