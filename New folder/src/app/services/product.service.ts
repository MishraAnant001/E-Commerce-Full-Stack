import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = "http://localhost:8000/api/v1/product"
  constructor(
    private http :HttpClient
  ) { }

  addProduct(data:FormData){
    return this.http.post(this.api,data,{observe:'response',withCredentials:true})
  }
  getProduct(){
    return this.http.get(this.api)
  }
  getFilterProducts(filterObject:any){
    return this.http.get(this.api,{
      params:filterObject
    })
  }
  updateProduct(id:string,data:FormData){
    return this.http.put(this.api+"/"+id,data,{observe:'response',withCredentials:true})
  }
  deleteProduct(id:string){
    return this.http.delete(this.api+"/"+id,{observe:'response',withCredentials:true})
  }
}
