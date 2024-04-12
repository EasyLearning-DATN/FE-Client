import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
})
export class ClassListComponent implements OnInit {
  avatarUrl = JSON.parse(localStorage.getItem('userInfo') || '{}').avatar ?? null;

  ngOnInit(): void {

  }
}
