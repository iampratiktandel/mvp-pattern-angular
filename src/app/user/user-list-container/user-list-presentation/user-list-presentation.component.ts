import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  
  /** emits user id to be deleted */
  @Output() public deleteUser: EventEmitter<number>;

  private _userList: User[];

  constructor(
    private userListPresenterService: UserListPresenterService
  ) { 
    this._userList = [];
    this.deleteUser = new EventEmitter();
  }

  ngOnInit(): void {
    this.userListPresenterService.userId$.subscribe((id: number) => {
      this.deleteUser.emit(id);
    })
  }

  public onDelete(id: number) {
    this.userListPresenterService.deleteUser(id)
  }
}
