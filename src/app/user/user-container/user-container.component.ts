import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserForm } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {

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

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        alert('User Deleted Successfully');
      }
    )
  }

  public addUser(data: UserForm) {
    this.userService.addUser(data).subscribe(
      (res) => {
        alert('User Added Successfully')
      }
    )
  }
}
