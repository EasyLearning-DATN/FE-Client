import { Component, ViewChild, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UpgradeService } from 'src/app/services/upgrade/upgrade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit{
  isLogin: any
  packages: any;
  amount: any;
  packageId: any;
  role = localStorage.getItem('userInfo.role');
  @ViewChild('paymentModal') paymentModal: any;

  constructor(
    private upgradeSrv: UpgradeService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.sharedService.checkLogin();
    this.getAllPackage();
    console.log(this.isLogin);
  }

  openPaymentModal(price: number, id: any) {
    this.amount = price;
    this.packageId = id;
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
    alert("Chức năng đang được phát triển")
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
    const id = JSON.parse(userString).id;
    // gọi service
    this.upgradeSrv.MoMo(this.amount, this.packageId).subscribe((res: any) => {
      console.log(res.payUrl);
      window.open(res.payUrl, '_blank');
    }, err => {
      console.log(err);
    });

  }

  getAllPackage() {
    this.upgradeSrv.getAllPackage().subscribe((res: any) => {
      this.packages = res.data.data;
      console.log(this.packages);
    }, err => {
      console.log(err);
    });
  }
}


