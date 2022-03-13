import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../user.model';

@Injectable()
export class UserListPresenterService {

  public userId: Subject<number>;
  public userId$: Observable<number>;

  constructor() { 
    this.userId = new Subject();
    this.userId$ = new Observable();

    this.userId$ = this.userId.asObservable();
  }

  public deleteUser(id: number) {
    this.userId.next(id);
  }

  /**
   * get filtered list based on search term
   * @param userList user list
   * @param searchItem search term
   * @returns filtered list
   */
   public getFilteredList(userList: User[], searchItem: string): User[] {
    return userList?.filter((user: User) => {
      if (
        user.id?.toString().includes(searchItem) ||
        user.name?.toLowerCase().includes(searchItem) ||
        user.age?.toLowerCase().includes(searchItem) ||
        user.gender?.toLowerCase().includes(searchItem)
      ) {
        return user;
      }
      return false;
    });
  }
}
