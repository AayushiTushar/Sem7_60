import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  uri: "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`http://localhost:8080/Product`);
  }
  getCategory() {
    return this.http.get(`http://localhost:8080/Category`)
  }
  getProductById(id) {
    return this.http.get('http://localhost:8080/Product/'+id)
  }
  addProduct(name,price,description,category) {
    const prod = {
      name: name,
      price: price,
      description: description,
      category: category
    }
    return this.http.post(`http://localhost:8080/Product`,prod)
  }
  deleteProduct(id) {
    return this.http.delete(`http://localhost:8080/Product/${id}`)
  }
  updateProduct(id,name,price,description,category) {
    const prod = {
      name: name,
      price: price,
      description: description,
      category: category
    }  
    return this.http.put('http://localhost:8080/Product/'+id,prod)
  }
}
