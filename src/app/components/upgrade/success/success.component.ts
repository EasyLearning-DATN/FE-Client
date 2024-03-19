
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient để gửi yêu cầu HTTP
import { PaymentSuccessService } from 'src/app/services/upgrade/payment/payment-success.service';
import { UserResponse } from 'src/app/responses/user/user.responses';
import { PaymemtStatusResponses } from 'src/app/responses/payment-status/payment-status.responses';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UpgradeService } from 'src/app/services/upgrade/upgrade.service';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  userResponse?: UserResponse | null;
  transId: string = '';
  requestId: string = '';
  total: string = '';
  date: string = '';
  orderID: string = '';
  userId: string = '';
  status: string = 'Khởi tạo hoá đơn!';

  constructor(
    private userService: UserService,
    private paymentService: PaymentSuccessService) { } // Inject HttpClient

  ngOnInit() {
    this.userResponse = JSON.parse(localStorage.getItem('userInfo') || '');
    const queryParams = new URLSearchParams(window.location.search);
    this.transId = queryParams.get('transId') || '';
    this.requestId = queryParams.get('requestId') || '';
    this.total = queryParams.get('amount') || '';
    this.date = queryParams.get('responseTime') || '';
    this.orderID = queryParams.get('orderId') || '';
    this.userId = this.userResponse?.id || '';
    this.status = this.status;
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
        this.checkStatus();
      },
      (error) => {
        console.error('Error creating invoice:', error);
      }
    );
  }

  // check status
  checkStatus() {
    this.paymentService.checkStatus(this.orderID, this.requestId).subscribe(
      (response: any) => {
        if (response.message === "Success") {
          this.userService.updateRoleUser(this.userId).subscribe(
            (response) => {
              console.log('Update role user:', response);
            },
            (error) => {
              console.error('Error updating role user:', error);
            }
          );
        } else {
          console.log('Payment status:', response.localMessage);
        }
      },
      (error) => {
        console.error('Error checking payment status:', error);
        // Xử lý lỗi nếu cần
      }
    );
  }
} 
