import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {ImageResponses} from 'src/app/responses/image/image.responses';
import {environment} from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {

  private apiUploadImage = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_FILE_UPLOAD;
  private apiDeleteImage = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_FILE_UPLOAD;

  constructor(
    private http: HttpClient,
  ) {
  }

  uploadImage(image: any, token: any) {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(this.apiUploadImage, formData)
    .pipe(
      map((response: any) => {
        const imageResponse: ImageResponses = response.data;
        return imageResponse;
      }),
    );
  }

  deleteImage(id: string) {
    return this.http.delete(this.apiDeleteImage + '/' + id);
  }


}
