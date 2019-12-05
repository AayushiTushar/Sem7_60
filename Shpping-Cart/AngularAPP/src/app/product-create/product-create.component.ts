import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Product } from './../product'
import { CartService } from './../cart.service'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  
  createForm: FormGroup;
  public categories: any;

  constructor(private cartservice: CartService, private router: Router, private fb: FormBuilder) { 
    this.createForm = this.fb.group({
      name: ['',Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      //image: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.fetchCategories()
  }

  fetchCategories() {
    this.cartservice.getCategory().subscribe( (data:any) => {
      this.categories = data;
      console.log(this.categories);
      console.log("Categories Fatched")
    })
  }

  show(name,price,description,category) {
    console.log(name,price,description,category)
  }

  addProduct(name,price,description,category) {
    this.cartservice.addProduct(name, price, description, category).subscribe( (data) => {
      //console.log(data);
      this.router.navigate([''])
    })
  }

}
