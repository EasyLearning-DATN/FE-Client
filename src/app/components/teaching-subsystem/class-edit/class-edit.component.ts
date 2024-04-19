import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {ClassroomDTO} from '../../../DTOS/classroom/classroom.dto';
import {ClassroomResponses} from '../../../responses/classroom/classroom.responses';
import {ClassroomService} from '../../../services/classroom/classroom.service';
import {SharedService} from '../../../services/shared/shared.service';
import {UploadImageService} from '../../../services/shared/upload/upload-image.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css'],
})
export class ClassEditComponent implements OnInit {
  urlImage: any;
  classroom!: ClassroomResponses;
  updateClassForm!: FormGroup;
  updateClassDTO!: ClassroomDTO;
  closeResult: string = '';
  @ViewChild('fileUpload', {static: true}) fileUpload !: ElementRef;

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService,
              private modalService: NgbModal, private classroomService: ClassroomService,
              private imageService: UploadImageService, private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getClassroom();
    this.initForm();
  }

  uploadImage(event: any) {
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e) => {
        this.urlImage = reader.result;
      };
    } else {
      this.urlImage = null;
    }
  }

  onUpdateClass() {

  }

  private getClassroom() {
    this.classroom = this.sharedService.classroom;
    this.sharedService.classroomChanged.subscribe(
      res => {
        this.classroom = res;
      },
    );
  }

  private initForm() {
    this.updateClassForm = new FormGroup({
      'name': new FormControl(this.classroom.name, [Validators.required]),
      'description': new FormControl(this.classroom.description, [Validators.required]),
      'isPublic': new FormControl(this.classroom.is_public, [Validators.required]),
      'standardPoint': new FormControl(10, [Validators.required, Validators.min(10), Validators.max(200)]),
    });
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
