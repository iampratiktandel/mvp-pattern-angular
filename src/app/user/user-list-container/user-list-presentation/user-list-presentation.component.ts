import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '../../user.model';
import { UserListPresenterService } from '../user-list-presenter/user-list-presenter.service';

@Component({
  selector: 'app-user-list-presentation',
  templateUrl: './user-list-presentation.component.html',
  styleUrls: ['./user-list-presentation.component.css'],
  viewProviders: [UserListPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListPresentationComponent implements OnInit {

  /** setter for user list */
  @Input() public set userList(value : User[] | null) {
    if (value) {
      this._userList = value;
    }
  }
  public get userList() : User[] | null {
    return this._userList;
  }
  
  private _userList: User[];

  constructor() { 
    this._userList = [];
  }

  ngOnInit(): void {
  }

}
