import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { User, UserEditDetails, UserForm } from '../../user.model';
import { UserFormPresentationComponent } from '../user-form-presentation/user-form-presentation.component';
import { UserListPresenterService } from '../user-list-presenter/user-list-presenter.service';


@Component({
  selector: 'app-user-list-presentation',
  templateUrl: './user-list-presentation.component.html',
  styleUrls: ['./user-list-presentation.component.css'],
  viewProviders: [UserListPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListPresentationComponent implements OnInit {

  /** setter for user list */
  @Input() public set userList(value: User[] | null) {
    if (value) {
      this._userList = value;
    }
  }
  public get userList(): User[] | null {
    return this._userList;
  }

  /** emits user id to be deleted */
  @Output() public deleteUser: EventEmitter<number>;
  /** emitter to emit add user data */
  @Output() public addUser: EventEmitter<UserForm>;
  /** emitter to emit edit user details */
  @Output() public editUser: EventEmitter<UserEditDetails>;

  /** user id */
  public userId!: number;

  private _userList: User[];

  constructor(
    private userListPresenterService: UserListPresenterService,
    private overlay: Overlay
  ) {
    this._userList = [];
    this.deleteUser = new EventEmitter();
    this.addUser = new EventEmitter();
    this.editUser = new EventEmitter();
  }

  ngOnInit(): void {
    this.userListPresenterService.userId$.subscribe((id: number) => {
      this.deleteUser.emit(id);
    })
  }

  /** on delete button click */
  public onDelete(id: number) {
    this.userListPresenterService.deleteUser(id)
  }

  /** on add button click */
  public onAdd() {
    this.openUserForm();
  }

  /** on edit button click */
  public onEdit(item: User) {
    this.userId = item.id;
    this.openUserForm(item);
  }

  /**
   * open user form dialog
   * @param userData user data - Optional
   */
  public openUserForm(userData?: User) {
    let componentRef: ComponentRef<UserFormPresentationComponent>;
    let overlayRef: OverlayRef;
    // set overlay config
    let overlayConfig: OverlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    // create overlay reference
    overlayRef = this.overlay.create(overlayConfig);
    const portal: ComponentPortal<UserFormPresentationComponent> = new ComponentPortal<UserFormPresentationComponent>(UserFormPresentationComponent);
    // attach overlay with portal
    componentRef = overlayRef.attach(portal);
    // listen to backdrop click
    overlayRef.backdropClick()
      .pipe(take(1)).subscribe(() => {
        overlayRef.detach();
      });

    // pass user data as input
    componentRef.instance.userData = userData as User;
    // listen to cancel event
    componentRef.instance.cancel.subscribe((res) => {
      overlayRef.detach();
    })
    // listen to add user event
    componentRef.instance.addUser.subscribe((res: UserForm) => {
      this.addUser.emit(res);
    })
    // listen to edit user event
    componentRef.instance.editUser.subscribe((res: UserForm) => {
      this.editUser.emit({userForm: res, id: this.userId});
    })
  }
}
