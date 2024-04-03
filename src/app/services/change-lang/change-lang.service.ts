import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeLangService {

  constructor(private translate: TranslateService) {
  }

  async getCurrentLangText(key: string): Promise<string> {
    const res$ = this.translate.get(key);
    let res: string = 'Hello';
    await lastValueFrom(res$).then(
      (data) => {
        res = data;
        return res;
      },
    );
    return res;
  }
}
