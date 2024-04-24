
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
  trans_id: string = '';
  requestId: string = '';
  total: string = '';
  order_id: string = '';
  user_info_id: string = '';
  package_upgrade_id: string = '';
  method_payment: string = '';
  status: string = '';

  constructor(
    private userService: UserService,
    private paymentService: PaymentSuccessService,
    private route: ActivatedRoute) { } // Inject HttpClient

  getUserInfoId() {

  }

  ngOnInit() {
    this.userResponse = JSON.parse(localStorage.getItem('userInfo') || '');
    const queryParams = new URLSearchParams(window.location.search);
    this.trans_id = queryParams.get('transId') || '';
    this.requestId = queryParams.get('requestId') || '';
    this.total = queryParams.get('amount') || '';
    this.order_id = queryParams.get('orderId') || '';
    this.user_info_id = this.userResponse?.id || '';
    this.method_payment = 'momo';
    if (queryParams.get('message') === 'Success') {
      this.status = 'paid';
      console.log(queryParams.get('message'));
    } else {
      this.status = 'unpaid';
    }
    console.log(this.user_info_id);

    // Trích xuất giá trị của id từ URL
    this.route.queryParams.subscribe(params => {
      const idParam = params['orderInfo'];
      if (idParam) {
        const match = idParam.match(/id=([^&]+)/);
        if (match && match[1]) {
          this.package_upgrade_id = match[1];
          console.log("package: " + this.package_upgrade_id)
        }
      }
    });

    this.fetchCreateInvoice();
  }

  fetchCreateInvoice() {
    // Gửi yêu cầu tạo hóa đơn đến service
    this.paymentService.createInvoice({
      trans_id: this.trans_id,
      total: this.total,
      order_id: this.order_id,
      user_info_id: this.user_info_id,
      package_upgrade_id: this.package_upgrade_id,
      method_payment: this.method_payment,
      status: this.status
    }).subscribe(
      (response) => {
        this.checkStatus();
        console.log(this.trans_id, this.status)
      },
      (error) => {

      }
    );
  }

  // check status
  checkStatus() {
    this.paymentService.checkStatus(this.order_id, this.requestId).subscribe(
      (response: any) => {
        if (response.message === "Success") {
          this.userService.updateRoleUser(this.user_info_id, this.package_upgrade_id).subscribe(
            (response) => {
              this.userService.getRoleUser(this.user_info_id).subscribe((response: any) => {
                var userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
                userInfo.role = response.data[0].role;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
              });

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
