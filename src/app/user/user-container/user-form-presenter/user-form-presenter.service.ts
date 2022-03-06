import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { UserForm } from '../../user.model';

@Injectable()
export class UserFormPresenterService {

  public userFormData: Subject<UserForm>;
  public userFormData$: Observable<UserForm>;

  constructor(
    private fb: FormBuilder
  ) { 
    this.userFormData = new Subject();
    this.userFormData$ = new Observable();

    this.userFormData$ = this.userFormData.asObservable();
  }

  public buildForm() {
    return this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    })
  }

  public onFormSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }

    this.userFormData.next(form.value);
  }
}
