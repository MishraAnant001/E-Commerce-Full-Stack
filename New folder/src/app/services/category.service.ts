import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api = "http://localhost:8000/api/v1/category"
  constructor(
    private http :HttpClient
  ) { }

  addCategory(data:string){
    return this.http.post(this.api,{name:data},{observe:'response',withCredentials:true})
  }
  getCategory(){
    return this.http.get(this.api)
  }
  updateCategory(id:string,data:string){
    return this.http.put(this.api+"/"+id,{name:data},{observe:'response',withCredentials:true})
  }
  deleteCategory(id:string){
    return this.http.delete(this.api+"/"+id,{observe:'response',withCredentials:true})
  }
}
