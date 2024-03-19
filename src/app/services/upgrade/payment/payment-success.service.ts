import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SharedService } from '../../shared/shared.service';
import { invoiceDTO } from 'src/app/DTOS/invoice/invoice.dto';

@Injectable({
  providedIn: 'root'
})


export class PaymentSuccessService {
  private apiPaymentSuccess = environment.API_URL + environment.API_ADMIN + environment.VERSION_1 + environment.API_INVOICE;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
  ) { }

  // create invoice
  //    {
  //     "orderID": 123,
  //     "requestId": 456,
  //     "date": "12/07/20274",
  //     "total": 999999,
  //     "userId": "129df52e-2ad2-4065-ac18-8f998da1cf3d",
  //     "status": "Khởi tạo hoá đơn"
  // }
  createInvoice(invoice: invoiceDTO) {
    const token = this.sharedService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.apiPaymentSuccess + '/create', invoice, {
      headers: headers,
    });
  }
}
