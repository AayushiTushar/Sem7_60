import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router'
import { Product } from './../product'
import { CartService } from './../cart.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id: String
  product: any;
  updateForm: FormGroup
  categories: any;

  constructor(private cartservie: CartService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, ) {
    this.createForm()
  }

  ngOnInit() {
    this.fetchCategory();
    this.getEditProduct();
  }

  fetchCategory() {
    this.cartservie.getCategory().subscribe( (data) => {
      this.categories = data
    })
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  getEditProduct() {
    this.route.params.subscribe( params => {
      this.id = params.id;
      this.cartservie.getProductById(this.id).subscribe( (prod) => {
        console.log(prod)
        this.product = prod
        this.updateForm.get('name').setValue(this.product.name);
        this.updateForm.get('price').setValue(this.product.price);
        this.updateForm.get('description').setValue(this.product.description);
        this.updateForm.get('category').setValue(this.product.category)
      })
    })
  }

  updateProduct(name,price,desciption,category) {
    this.cartservie.updateProduct(this.id,name,price,desciption,category).subscribe( (res) => {
      this.router.navigate([''])
    })
  }
}
