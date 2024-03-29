import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommentDTO } from 'src/app/DTOS/comment/comment.dto';
import { CommentService } from 'src/app/services/comment/comment.service';
import Swal from 'sweetalert2';

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

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.createCommentF = this.fb.group({
      comment: ['', Validators.required],
    });
    this.initData();
  }

  initData() {
    this.isCommentFetching = true;
    const params: any = {};
    params.lessonId = this.lessonId;
    this.commentService.getCommentMember(params).subscribe(
      (response) => {
        this.listComment = response.data.data;
        this.isCommentFetching = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCreateComment() {
    Swal.fire({
      title: 'Đang tạo bình luận ...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.createComment();
  }

  createComment() {
    if (this.createCommentF.valid) {
      const commentDTO = new CommentDTO(
        this.createCommentF.value.comment,
        this.lessonId
      );
      this.commentService.create(commentDTO).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Tạo bình luận thành công!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          this.createCommentF.setValue({ comment: '' });
          this.listComment.unshift(response.data);
          this.updateTotalCMT.emit();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Tạo bình luận thất bại!',
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
}
