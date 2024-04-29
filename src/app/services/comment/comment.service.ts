import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { CommentDTO } from 'src/app/DTOS/comment/comment.dto';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiCreateComment =
    environment.API_URL +
    environment.API_MEMBER +
    environment.VERSION_1 +
    environment.API_COMMENT;

  private apiGetCommentMember =
    environment.API_URL +
    environment.API_MEMBER +
    environment.VERSION_1 +
    environment.API_COMMENT;

  private apiGetCommentPublic =
    environment.API_URL +
    environment.API_PUBLIC +
    environment.VERSION_1 +
    environment.API_COMMENT;

  private apiActionCommentMember =
    environment.API_URL +
    environment.API_MEMBER +
    environment.VERSION_1 +
    environment.API_REACTION;

  constructor(private http: HttpClient) {}

  // create comment
  create(commentDTO: CommentDTO) {
    const token = localStorage.getItem('token');
    return this.http
      .post<any>(this.apiCreateComment, commentDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((response) => {
          return response;
        }),
        tap((response) => {
          console.log(response);
        })
      );
  }

  getCommentMember(params: any) {
    const token = localStorage.getItem('token');
    return this.http
      .get<any>(this.apiGetCommentMember, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getCommentPublic(params: any) {
    return this.http
      .get<any>(this.apiGetCommentPublic, {
        params: params,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  reactionComment(body: any) {
    const token = localStorage.getItem('token');
    return this.http
      .post<any>(this.apiActionCommentMember, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
