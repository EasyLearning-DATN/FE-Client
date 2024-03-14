import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  constructor(private http : HttpClient) { }

  VNPay(price: any, id: any) {
    const formData = new FormData();
    formData.append('price', price);
    formData.append('id', id);
    
    const headers = new HttpHeaders();

    return this.http.post(`localhost/pay`, formData, { headers, responseType: 'text' })
  }
  MoMo(amount: any) {
    const headers = new HttpHeaders();
  
    return this.http.post(`localhost/create-order?amount=${amount}`, { headers, responseType: 'text' })
  }
}
