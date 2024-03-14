import { Component, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UpgradeService } from 'src/app/services/upgrade/upgrade.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent {
  isLogin: any
  @ViewChild('paymentModal') paymentModal: any;

  constructor(
    private upgradeSrv: UpgradeService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.sharedService.checkLogin();
    console.log(this.isLogin);
  }

  openPaymentModal() {
    this.paymentModal.nativeElement.style.display = 'block';
  }

  closePaymentModal() {
    this.paymentModal.nativeElement.style.display = 'none';
  }

  choosePayment(paymentMethod: string) {
    // nếu phương thức thanh toán là VNPay
    if (paymentMethod === 'VNPay') {
      this.PayVNPay();
    }
    // nếu phương thức thanh toán là MoMo
    if (paymentMethod === 'MoMo') {
      this.PayMomo();
    }
  }

  PayVNPay() {
    if (this.isLogin == false) {
      alert('Bạn cần đăng nhập để nâng cấp tài khoản');
      return;
    }
    const userString = localStorage.getItem('userInfo');
    if (!userString) {
      alert('Không tìm thấy thông tin người dùng');
      return;
    }
    const price = 99000;
    const id = JSON.parse(userString).id;
    // gọi service
    this.upgradeSrv.VNPay(price, id).subscribe((res: any) => {
      console.log(res);
      window.open(res, '_blank');
    }, err => {
      console.log(err);
    });

  }
  PayMomo() {
    if (this.isLogin == false) {
      alert('Bạn cần đăng nhập để nâng cấp tài khoản');
      return;
    }
    const userString = localStorage.getItem('userInfo');
    if (!userString) {
      alert('Không tìm thấy thông tin người dùng');
      return;
    }
    const amount = 99000;
    const id = JSON.parse(userString).id;
    // gọi service
    this.upgradeSrv.MoMo(amount).subscribe((res: any) => {
      console.log(res);
      window.open(res.payUrl, '_blank');
    }, err => {
      console.log(err);
    });

  }
}


