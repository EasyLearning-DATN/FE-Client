import { SharedService } from './../../../../../services/shared/shared.service';
import { CommentService } from './../../../../../services/comment/comment.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommentDTO } from 'src/app/DTOS/comment/comment.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment: any;
  @Input() lessonId: any;
  @Input() idCommentReply!: string;
  @Input() rootId!: string;
  @Input() isShowTotalRPL!: boolean;
  @Output() showReplyComment = new EventEmitter<string>();
  isShowReplyForm: boolean = false;
  isLoadingCommentReply: boolean = false;
  isLoadedListReply: boolean = false;

  timeDuration: string = '';
  contentReply: string = '';
  usernameReply: string = '';
  listCommentReply: any[] = [];
  listCommentReplyLocal: any[] = [];
  isLiked: boolean = false;
  isDisLiked: boolean = false;
  isLoadingReaction: boolean = false;

  replyCommentF: FormGroup = new FormGroup({
    contentReply: new FormControl(['']),
  });

  @ViewChild('inputReplyRef', { static: false }) inputReplyRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.timeDuration = this.getTimeDuration(this.comment.dateCreate);
    this.replyCommentF = this.fb.group({
      contentReply: ['', Validators.required],
    });
    this.isLiked = this.comment.isLiked;
    this.isDisLiked = this.comment.isDisLiked;
  }

  getTimeDuration(dateCreate: string) {
    const dateComment = new Date(dateCreate);
    const currentDate = new Date();
    const duration = Math.floor(
      (currentDate.getTime() - dateComment.getTime()) / 1000
    );
    if (duration < 60) {
      // second
      return `${duration} giây trước`;
    }
    if (duration < 60 * 60) {
      // minute
      return `${Math.floor(duration / 60)} phút trước`;
    }
    if (duration < 60 * 60 * 24) {
      // hour
      return `${Math.floor(duration / 3600)} giờ trước`;
    }
    return `${Math.floor(duration / 86400)} ngày trước`;
  }

  showFormReplyComment(id: string) {
    if (!this.isShowReplyForm) {
      this.showReplyComment.emit(id);
      this.isShowReplyForm = true;
      setTimeout(() => {
        if (this.inputReplyRef) {
          this.inputReplyRef.nativeElement.focus();
        }
      }, 1);
    } else {
      this.isShowReplyForm = false;
    }
  }

  hideFormReplyComment(id: string) {
    this.isShowReplyForm = false;
  }

  loadCommentReply(rootId: string) {
    if (!this.isLoadedListReply && this.listCommentReply.length <= 0) {
      this.isLoadingCommentReply = true;
      const params: any = {};
      params.rootId = rootId;
      params.lessonId = this.lessonId;
      this.commentService.getCommentMember(params).subscribe(
        (response) => {
          this.isLoadingCommentReply = false;
          this.isLoadedListReply = true;
          this.listCommentReplyLocal = [];
          this.listCommentReply = response.data.data;
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (!this.isLoadedListReply && this.listCommentReply.length > 0) {
      this.isLoadedListReply = true;
    } else {
      this.isLoadedListReply = false;
    }
    if (!this.rootId) {
      this.showReplyComment.emit(this.comment.id);
    }
  }

  onReplyComment() {
    Swal.fire({
      title: 'Đang phản hồi bình luận ...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.replyComment();
  }

  replyComment() {
    if (this.replyCommentF.valid) {
      const commentDTO: CommentDTO = {
        content: this.replyCommentF.value.contentReply,
        lessonId: this.lessonId,
        rootId: this.rootId,
        usernameReply: this.comment.creator?.username,
      };
      this.commentService.create(commentDTO).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Phản hồi bình luận thành công!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          this.replyCommentF.setValue({ contentReply: '' });
          if (!this.isLoadedListReply) {
            this.listCommentReplyLocal.unshift(response.data);
          } else {
            this.listCommentReply.unshift(response.data);
          }
          this.comment.amountChild += 1;
          this.isShowReplyForm = false;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Phản hồi bình luận thất bại!',
            text: error.error.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }

  handleShowReplyCommentSub(idCommentReply: string) {
    this.idCommentReply = idCommentReply;
  }

  handleActionComment(id: any, type: boolean) {
    let rec = {
      commentId: id,
      liked: type,
    };

    if (type) {
      if (this.isLiked) {
        this.comment.amountLike -= 1;
        this.isLiked = false;
      } else {
        this.comment.amountLike += 1;
        this.isLiked = true;
      }
    } else {
      if (this.isDisLiked) {
        this.comment.amountDisLike -= 1;
        this.isDisLiked = false;
      } else {
        this.comment.amountDisLike += 1;
        this.isDisLiked = true;
      }
    }

    if (!this.isLoadingReaction) {
      this.isLoadingReaction = true;
      this.commentService.reactionComment(rec).subscribe((res) => {
        this.isLoadingReaction = false;
      });
    }
  }
}
