import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../Utils/appConstant';
import { IPayment } from '../Interface/ipayment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient){}

  savePayment(payment:IPayment):Observable<IPayment>{
    let  token=localStorage.getItem("tokenValue");
    // console.log("jwt token="+token)
     let header:HttpHeaders  = new HttpHeaders()

       const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `${token}`)
      let url:string= BASE_URL+ "/payment";
    return this.http.post<IPayment>(url, payment,{headers})
  }
  
}