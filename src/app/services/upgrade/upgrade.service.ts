import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  private apiPaymentMoMo = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_PAYMENT + environment.API_MOMO;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient) { }

  VNPay(price: any, id: any) {
    const formData = new FormData();
    formData.append('price', price);
    formData.append('id', id);

    const headers = new HttpHeaders();

    return this.http.post(`localhost/pay`, formData, { headers, responseType: 'text' })
  }
  MoMo(amount: any) {
    const token = this.sharedService.getToken();
    return this.http.post(this.apiPaymentMoMo + `/create-order?amount=${amount}`, null, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })
  }
}
