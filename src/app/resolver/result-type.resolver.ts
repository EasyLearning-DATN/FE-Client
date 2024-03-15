import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {ViewResultTypeService} from "../services/view-result-type/view-result-type.service";
import {ResultTypeResponses} from "../responses/result_type_id/result_type.responses";

export const resultTypeResolver: ResolveFn<ResultTypeResponses[]> = (route, state) => {
  const resultTypeService = inject(ViewResultTypeService);
  // const sharedService = inject(SharedService);
  // const resultTypes = sharedService.resultType;

  const resultTypesSes = JSON.parse(<string>sessionStorage.getItem('resultTypes'));
  if (resultTypesSes === null) {
    return resultTypeService.getViewResultType();
  } else {
    return resultTypesSes;
  }
};
