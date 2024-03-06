import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReportDTO } from 'src/app/DTOS/report/report.dto';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_REPORT;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  sendReport(reportDTO: ReportDTO) {
    console.log('này trong api: ' + reportDTO);
    const token = localStorage.getItem('token') || 'null';
    return this.http.post(this.apiReport, reportDTO, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
