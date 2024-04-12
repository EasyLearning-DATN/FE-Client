import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/responses/user/user.responses';

@Component({
  selector: 'app-teaching-subsystem',
  templateUrl: './teaching-subsystem.component.html',
  styleUrls: ['./teaching-subsystem.component.css']
})
export class TeachingSubsystemComponent implements OnInit{
  avatarUrl = JSON.parse(localStorage.getItem('userInfo') || '{}').avatar ?? null;

  ngOnInit(): void {

  }
}
