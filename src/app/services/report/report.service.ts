import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { image } from 'ngx-bootstrap-icons';
import { Observable, switchMap } from 'rxjs';
import { ReportDTO } from 'src/app/DTOS/report/report.dto';
import { environment } from 'src/environments/environments';
import { UploadImageService } from '../shared/upload/upload-image.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  private apiReport = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_REPORT;
  constructor(
    private http: HttpClient,
    private router: Router,
    private imageSrv: UploadImageService,
  ) { }

  sendReport(reportDTO: ReportDTO, imageReport: any): Observable<any> {
    const formData = new FormData();
    formData.append('targetId', reportDTO.targetId);
    formData.append('reason', reportDTO.reason);
    formData.append('type', reportDTO.type);
    formData.append('image', imageReport);
    console.log(imageReport);
    const token = localStorage.getItem('token') || 'null';
    return this.http.post(this.apiReport, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
}
