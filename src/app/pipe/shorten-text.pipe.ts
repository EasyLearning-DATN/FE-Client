import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortenText',
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string, limit: number = 50): any {
    if (value.length > limit) {
      return value.substring(0, limit) + ' ...';
    }
    return value;
  }

}
