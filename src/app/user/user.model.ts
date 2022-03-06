/** User Model */
export class User {
  public id: number;
  public name: string;
  public age: string;
  public gender: string;
  constructor(
    id: number,
    name: string,
    age: string,
    gender: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

/** User Form Model */
export class UserForm {
  public name: string;
  public age: string;
  public gender: string;
  constructor(
    name: string,
    age: string,
    gender: string
  ) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

/** User Edit Details Model */
export class UserEditDetails {
  public userForm: UserForm;
  public id: number;
  constructor(
    userForm: UserForm,
    id: number
  ) {
    this.userForm = userForm;
    this.id = id;
  }
}