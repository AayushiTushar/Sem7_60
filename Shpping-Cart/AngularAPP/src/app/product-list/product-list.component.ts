import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { Product } from './../product';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[];
  constructor(private cartservice: CartService, private router: Router) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.cartservice.getProducts().subscribe( (data:Product[]) => {
      this.products = data;
      // this.products.forEach(product => {
      //   var binary = '';
      //   // var bytes = [].slice.call(new Uint8Array(product.image.data));
      //   // bytes.forEach((b) => binary += String.fromCharCode(b));
      //   //product.image = ;
      // });
      console.log("Products Fetched")
      console.log(this.products);
    })
  }

  editProduct(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteProduct(id) {
    this.cartservice.deleteProduct(id).subscribe( (res) => {
      this.router.navigate([''])
    })
  }
}
