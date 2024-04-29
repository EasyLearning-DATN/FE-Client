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
import { TranslateService } from '@ngx-translate/core';
import { CommentDTO } from 'src/app/DTOS/comment/comment.dto';
import Swal from 'sweetalert2';
import { TRANSLATE } from '../../../../../../environments/environments';
import { CommentService } from '../../../../../services/comment/comment.service';
import { UserService } from 'src/app/services/user/user-service.service';

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
  @Output() updateTotalCMT = new EventEmitter<string>();
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
  isLogged: boolean = false;

  @ViewChild('inputReplyRef', { static: false }) inputReplyRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private translateService: TranslateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.timeDuration = this.getTimeDuration(this.comment.dateCreate);
    this.replyCommentF = this.fb.group({
      contentReply: ['', Validators.required],
    });
    this.isLiked = this.comment.isLiked;
    this.isDisLiked = this.comment.isDisLiked;
    this.isLogged = !!this.userService.isLogin();
  }

  getTimeDuration(dateCreate: string) {
    const dateComment = new Date(dateCreate);
    const currentDate = new Date();
    const duration = Math.floor(
      (currentDate.getTime() - dateComment.getTime()) / 1000
    );
    let message = '';
    if (duration < 60) {
      // second
      this.translateService
        .stream(TRANSLATE.MESSAGE.TEXT.COMMENT_ITEM_001)
        .subscribe((res) => {
          message = res;
        });
      return `${duration} ${message}`;
    }
    if (duration < 60 * 60) {
      // minute
      this.translateService
        .stream(TRANSLATE.MESSAGE.TEXT.COMMENT_ITEM_002)
        .subscribe((res) => {
          message = res;
        });
      return `${Math.floor(duration / 60)}${message}`;
    }
    if (duration < 60 * 60 * 24) {
      // hour
      this.translateService
        .stream(TRANSLATE.MESSAGE.TEXT.COMMENT_ITEM_003)
        .subscribe((res) => {
          message = res;
        });
      return `${Math.floor(duration / 3600)} ${message}`;
    }
    this.translateService
      .stream(TRANSLATE.MESSAGE.TEXT.COMMENT_ITEM_004)
      .subscribe((res) => {
        message = res;
      });
    return `${Math.floor(duration / 86400)} ${message}`;
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
    if (this.isLogged) {
      let title = '';
      this.translateService
        .stream(TRANSLATE.MESSAGE.PROGRESS.COMMENT_ITEM_001)
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
      this.replyComment();
    } else {
      this.alterRequireLogin();
    }
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
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Phản hồi bình luận thành công!',
          //   confirmButtonColor: '#3085d6',
          //   confirmButtonText: 'OK',
          // });
          Swal.close();
          this.replyCommentF.setValue({ contentReply: '' });
          if (!this.isLoadedListReply) {
            this.listCommentReplyLocal.unshift(response.data);
          } else {
            this.listCommentReply.unshift(response.data);
          }
          this.comment.amountChild += 1;
          this.isShowReplyForm = false;
          this.updateTotalCMT.emit();
        },
        (error) => {
          Swal.close();
          let title = '';
          this.translateService
            .stream(TRANSLATE.MESSAGE.ERROR.COMMENT_ITEM_001)
            .subscribe((res) => {
              title = res;
            });
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

  handleShowReplyCommentSub(idCommentReply: string) {
    this.idCommentReply = idCommentReply;
  }

  handleActionComment(id: any, type: boolean) {
    if (this.isLogged) {
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
    } else {
      this.alterRequireLogin();
    }
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
