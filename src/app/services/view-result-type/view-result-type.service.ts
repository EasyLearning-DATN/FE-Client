import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared/shared.service";
import {Router} from "@angular/router";
import {map, tap} from "rxjs";
import {ResultTypeResponses} from "../../responses/result_type_id/result_type.responses";

@Injectable({
  providedIn: 'root',
})
export class ViewResultTypeService {

  private apiAllViewResultType = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_VIEW_RESULT_TYPE;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) {
  }

  getViewResultType() {
    return this.http.get<any>(this.apiAllViewResultType).pipe(
      map(res => {
        return res.data;
      }), tap((res: ResultTypeResponses[]) => {
        // this.sharedService.resultType = res;
        sessionStorage.setItem('resultTypes', JSON.stringify(res));
      }, err => {
        console.log(err);
      }))
      ;
  }
}
