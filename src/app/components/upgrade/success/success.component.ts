import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient để gửi yêu cầu HTTP
import { PaymentSuccessService } from 'src/app/services/upgrade/payment/payment-success.service';
import { UserResponse } from 'src/app/responses/user/user.responses';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  userResponse?: UserResponse | null;
  transId: string = '';
  total: string = '';
  date: string = '';
  orderID: string = '';
  userId: string = '';
  status: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private paymentService : PaymentSuccessService) {} // Inject HttpClient

  ngOnInit() {
    this.userResponse = JSON.parse(localStorage.getItem('userInfo') || '');
    const queryParams = new URLSearchParams(window.location.search);
    this.transId = queryParams.get('transId') || '';
    this.total = queryParams.get('amount') || '';
    this.date = queryParams.get('responseTime') || '';
    this.orderID = queryParams.get('orderId') || '';
    this.userId = this.userResponse?.id || '';
    this.status = queryParams.get('message') || '';
    console.log(this.userId);
    this.fetchCreateInvoice();
  }

  fetchCreateInvoice() {
    // Gửi yêu cầu tạo hóa đơn đến service
    this.paymentService.createInvoice({
      transId: this.transId,
      total: this.total,
      date: this.date,
      orderID: this.orderID,
      userId: this.userId,
      status: this.status
    }).subscribe(
      (response) => {
        console.log('Invoice created successfully:', response);
        // Xử lý phản hồi nếu cần
      },
      (error) => {
        console.error('Error creating invoice:', error);
        // Xử lý lỗi nếu cần
      }
    );
  }
} 
