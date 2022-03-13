import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User, UserForm } from '../../user.model';
import { UserFormPresenterService } from '../user-form-presenter/user-form-presenter.service';

@Component({
  selector: 'app-user-form-presentation',
  templateUrl: './user-form-presentation.component.html',
  styleUrls: ['./user-form-presentation.component.css'],
  viewProviders: [UserFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormPresentationComponent implements OnInit {

  /** setter for user data */
  @Input() public set userData(value: User) {
    if (value) {
      this.formTitle = 'Edit User';
      this._userData = value;
      this.userForm.patchValue(value);
    }
  }
  public get userData(): User {
    return this._userData;
  }

  /** emitter to emit cancel event */
  @Output() public cancel: EventEmitter<Date>;
  /** emitter to emit add user data */
  @Output() public add: EventEmitter<UserForm>;
  /** emitter to emit edit user data */
  @Output() public edit: EventEmitter<UserForm>;
  
  /** ttile of form */
  public formTitle: string;
  /** user form */
  public userForm: FormGroup;
  /** boolean to check if form has been submitted */
  public isFormSubmitted: boolean;

  /** user data */
  private _userData!: User;

  constructor(
    private userFormPresenterService: UserFormPresenterService
  ) { 
    this.cancel = new EventEmitter();
    this.add = new EventEmitter();
    this.edit = new EventEmitter();
    this.formTitle = 'Add User';
    this.userForm = this.userFormPresenterService.buildForm();
    this.isFormSubmitted = false;
  }

  ngOnInit(): void {
    this.userFormPresenterService.userFormData$.subscribe((res: UserForm)=> {
      if (this.formTitle === 'Add User') {
        this.add.emit(res);
      } else {
        this.edit.emit(res);
      }
    })
  }
  
  /** on submit button click */
  public onSubmit() {
    this.isFormSubmitted = true;
    this.userForm.value.name = this.userForm.value.name.trim();
    console.log(this.userForm.value)

    this.userFormPresenterService.onFormSubmit(this.userForm);
  }

  /** on cancel button click */
  public onCancel() {
    this.cancel.emit(new Date());
  }

  get userFormControl(){
    return this.userForm.controls;
  }
}
