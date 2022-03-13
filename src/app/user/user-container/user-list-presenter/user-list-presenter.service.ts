import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../user.model';

@Injectable()
export class UserListPresenterService {

  private delete: Subject<number>;
  public delete$: Observable<number>;

  constructor() { 
    this.delete = new Subject();
    this.delete$ = new Observable();

    this.delete$ = this.delete.asObservable();
  }

  public deleteUser(id: number) {
    this.delete.next(id);
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
