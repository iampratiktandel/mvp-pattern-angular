import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
}
