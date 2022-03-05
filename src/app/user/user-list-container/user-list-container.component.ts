import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.css']
})
export class UserListContainerComponent implements OnInit {

  /** user list data */
  public userList$: Observable<User[]>

  constructor(
    private userService: UserService
  ) { 
    this.userList$ = new Observable();
  }

  ngOnInit(): void {
    this.userList$ = this.userService.getUsers();
  }

}
