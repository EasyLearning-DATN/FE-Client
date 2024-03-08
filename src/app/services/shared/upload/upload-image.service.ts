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
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    formData.append('file', image);
    return this.http.post(this.apiUploadImage, formData, {headers})
    .pipe(
      map((response: any) => {
        const imageResponse: ImageResponses = response.data;
        return imageResponse;
      }),
    );
  }

  deleteImage(id: string) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.delete(this.apiDeleteImage + '/' + id, {
      headers: headers,
    });
  }


}
