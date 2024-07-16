import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { IUser } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private userAPI = "http://localhost:8000/api/v1/users"
  private loginAPI = "http://localhost:8000/api/v1/login"
  constructor(
    private http :HttpClient
  ) { }

  registerUser(userdata:IUser){
    return this.http.post(this.userAPI,userdata,{observe:'response'})
  }
  loginUser(data:{email:string,password:string}){
    return this.http.post(this.loginAPI,data,{observe:'response',withCredentials:true},)
  }

}
