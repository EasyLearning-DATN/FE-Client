import {Component, OnInit} from '@angular/core';
import {TestResponses} from "../../../responses/test/test.responses";
import {TestService} from "../../../services/test/test.service";
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css'],
})
export class TestDetailComponent implements OnInit {
  test !: TestResponses;
  isCreator: boolean = false;

  constructor(private testService: TestService, private route: ActivatedRoute, private sharedService: SharedService) {

  }

  ngOnInit() {
    this.test = this.sharedService.test;
    this.sharedService.testChanged.subscribe(
      (test) => {
        this.test = test;
      },
    );

    console.log(this.test);

    // truyển userInfo từ localStorage và lấy id
    const userInfoString = localStorage.getItem('userInfo') || '';
    if (userInfoString === '') {
      this.isCreator = false;
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      const userId = userInfo ? userInfo.id : '';

      // Kiểm tra xem user có phải người tạo bài học hay không
      this.testService.checkTestOfUser(userId, this.test.id).subscribe(
        (response) => {
          // console.log(response.data.length);
          this.isCreator = response.length !== 0;
        },
        error => {
          this.isCreator = false;
        },
      );
    }
  }

  onCopyURL() {
    // Copy đường dãn vào clipboard
    navigator.clipboard.writeText(window.location.href);
  }
}
