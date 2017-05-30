import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Product } from '../products.model';
import { ProductsService } from '../products.service';
import { CartService } from '../../cart/cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  bookId: number;
  book: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.bookId = params['id']
    )
    this.getBook()
  }

  getBook() {
    this.productsService.getProduct(this.bookId).subscribe(
      (response: Product) => this.book = response,
      (error: Response) => console.log('error: ', error)
    )
  }

  navigateBack(){
    this.router.navigate(['']);
  }

}
