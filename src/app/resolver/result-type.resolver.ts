import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {ViewResultTypeService} from "../services/view-result-type/view-result-type.service";
import {ResultTypeResponses} from "../responses/result_type_id/result_type.responses";
import {SharedService} from "../services/shared/shared.service";

export const resultTypeResolver: ResolveFn<ResultTypeResponses[]> = (route, state) => {
  const resultTypeService = inject(ViewResultTypeService);
  const sharedService = inject(SharedService);
  const resultTypes = sharedService.resultType;
  if (resultTypes === undefined) {
    return resultTypeService.getViewResultType();
  } else {
    return resultTypes;
  }
};
