import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { Router } from '@angular/router';

import { ProductsService } from './products.service';
import { Product } from './products.model';
import { CartService } from '../cart/cart.service';
import {Category} from "./category.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private books: Product[];
  private categories: Category[];
  private data = {};

  constructor(private productsService: ProductsService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.getBooks();
    this.getCategories();
  }

  getBooks(){
    this.productsService.getProducts().subscribe(
      (response: Product[]) => {
        this.books = response;
      },
      (error: Response) => console.log('couldn\'t get products')
    );
  };

  getCategories(){
    this.productsService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error: Response) => console.log('couldn\'t get categories')
    );
  }

  showBook(id: number){
    console.log('id: ', id);
    this.router.navigate(['book', id]);
  };



  addToCart(product: Product, id: number) {
    console.log('addtocart: ', this.data);
    // this.cartService.addProductToCart(product);
    this.cartService.addCartItem(product.id, 1, this.data[id], product);
  }

}
