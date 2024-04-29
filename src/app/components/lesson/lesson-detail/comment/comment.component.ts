import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CommentDTO } from 'src/app/DTOS/comment/comment.dto';
import { CommentService } from 'src/app/services/comment/comment.service';
import Swal from 'sweetalert2';
import { TRANSLATE } from '../../../../../environments/environments';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() lessonId!: string;
  @Input() totalCMT!: number;
  @Output() updateTotalCMT = new EventEmitter<string>();
  isCommentFetching: boolean = false;
  listComment: any[] = [];
  idCommentReply: string = '';
  comment: string = '';
  createCommentF: FormGroup = new FormGroup({
    comment: new FormControl(['']),
  });
  isLogged: boolean = false;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createCommentF = this.fb.group({
      comment: ['', Validators.required],
    });
    this.initData();
    this.isLogged = !!this.userService.isLogin();
  }

  initData() {
    this.isCommentFetching = true;
    const params: any = {};
    params.lessonId = this.lessonId;

    if (this.userService.isLogin()) {
      this.commentService.getCommentMember(params).subscribe(
        (response) => {
          this.listComment = response.data.data;
          this.isCommentFetching = false;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.commentService.getCommentPublic(params).subscribe(
        (response) => {
          this.listComment = response.data.data;
          this.isCommentFetching = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onCreateComment() {
    if (this.isLogged) {
      let title = '';
      this.translateService
        .stream(TRANSLATE.MESSAGE.PROGRESS.COMMENT_001)
        .subscribe((res) => {
          title = res;
        });
      Swal.fire({
        title: title,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.createComment();
    } else {
      this.alterRequireLogin();
    }
  }

  createComment() {
    if (this.createCommentF.valid) {
      const commentDTO = new CommentDTO(
        this.createCommentF.value.comment,
        this.lessonId
      );
      let title = '';
      this.commentService.create(commentDTO).subscribe(
        (response: any) => {
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Tạo bình luận thành công!',
          //   confirmButtonColor: '#3085d6',
          //   confirmButtonText: 'OK',
          // });
          Swal.close();
          this.createCommentF.setValue({ comment: '' });
          this.listComment.unshift(response.data);
          this.updateTotalCMT.emit();
        },
        (error) => {
          this.translateService
            .stream(TRANSLATE.MESSAGE.ERROR.COMMENT_001)
            .subscribe((res) => {
              title = res;
            });
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: title,
            text: error.error.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }

  handleShowReplyComment(idCommentReply: string) {
    this.idCommentReply = idCommentReply;
  }

  alterRequireLogin() {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: 'Vui lòng đăng nhập để sử dụng tính năng này!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }
}
