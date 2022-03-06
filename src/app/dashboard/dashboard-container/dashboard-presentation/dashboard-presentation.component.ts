import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-dashboard-presentation',
  templateUrl: './dashboard-presentation.component.html',
  styleUrls: ['./dashboard-presentation.component.css']
})
export class DashboardPresentationComponent implements OnInit {

  /** setter for user list */
  @Input() public set userList(value: User[] | null) {
    if (value) {
      this.totalUsers = value.length;
      this._userList = value;
    }
  }
  public get userList(): User[] | null {
    return this._userList;
  }

  /** total user count */
  public totalUsers: number;

  private _userList: User[];
  
  constructor() {
    this._userList = [];
    this.totalUsers = 0;
  }

  ngOnInit(): void {
  }

}
