import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent implements OnInit {

  /** user list data */
  public userList$: Observable<User[]>

  constructor(
    private dashboardService: DashboardService
  ) { 
    this.userList$ = new Observable();
  }

  ngOnInit(): void {
    this.userList$ = this.dashboardService.getUsers();
  }


}
