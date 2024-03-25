import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared/shared.service";
import {environment} from "../../../environments/environments";
import {TestReportDTO} from "../../DTOS/test-report/test-report.dto";

@Injectable({
  providedIn: 'root',
})
export class TestReportService {

  private apiCreateTestReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST_REPORT;
  private apiGetOneTestReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST_REPORT;
  private apiGetListReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST_REPORT;
  private apiDeleteTestReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST_REPORT;

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  createTestReport(testReport: TestReportDTO) {

  }

  deleteTestReport(id: string) {

  }


}
