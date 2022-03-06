import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserForm } from '../../user.model';
import { UserFormPresenterService } from '../user-form-presenter/user-form-presenter.service';

@Component({
  selector: 'app-user-form-presentation',
  templateUrl: './user-form-presentation.component.html',
  styleUrls: ['./user-form-presentation.component.css'],
  viewProviders: [UserFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormPresentationComponent implements OnInit {

  /** emitter to emit cancel event */
  @Output() public cancel: EventEmitter<Date>;
  /** emitter to emit add user data */
  @Output() public addUser: EventEmitter<UserForm>;
  
  /** user form */
  public userForm: FormGroup;
  /** boolean to check if form has been submitted */
  public isFormSubmitted: boolean;

  constructor(
    private userFormPresenterService: UserFormPresenterService
  ) { 
    this.cancel = new EventEmitter();
    this.addUser = new EventEmitter();
    this.userForm = this.userFormPresenterService.buildForm();
    this.isFormSubmitted = false;
  }

  ngOnInit(): void {
    this.userFormPresenterService.userFormData$.subscribe((res: UserForm)=> {
      this.addUser.emit(res);
    })
  }
  
  public onSubmit() {
    this.isFormSubmitted = true;
    this.userFormPresenterService.onFormSubmit(this.userForm);
  }

  public onCancel() {
    this.cancel.emit(new Date());
  }

  get userFormControl(){
    return this.userForm.controls;
  }
}
