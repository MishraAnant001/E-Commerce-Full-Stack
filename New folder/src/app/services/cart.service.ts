import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartProduct } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API = "http://localhost:8000/api/v1/cart"
  constructor(
    private http :HttpClient
  ) { }

  AddProduct(product:ICartProduct){
    return  this.http.post(this.API,product,{observe:'response',withCredentials:true})
  }
  updateCart(products:Array<ICartProduct>){
    return this.http.put(this.API,products,{observe:'response',withCredentials:true})
  }
  getCart(){
    return this.http.get(this.API,{observe:'response',withCredentials:true})
  }
}
