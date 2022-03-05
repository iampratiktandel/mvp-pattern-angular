import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  
  /**
   * api to get list of users
   * @returns user list as observable
   */
  getUsers(): Observable<User[]> {
    let url = 'http://localhost:3000/users';
    return this.http.get<User[]>(url);
  }

  /**
   * api to delete user
   * @param id user id
   */
   deleteUser(id: number) {
    let url = `http://localhost:3000/users/${id}`;
    return this.http.delete(url);
  }
}
