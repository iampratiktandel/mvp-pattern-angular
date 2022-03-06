import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { User, UserForm } from '../../user.model';
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

  private _userList: User[];

  constructor(
    private userListPresenterService: UserListPresenterService,
    private overlay: Overlay
  ) {
    this._userList = [];
    this.deleteUser = new EventEmitter();
    this.addUser = new EventEmitter();
  }

  ngOnInit(): void {
    this.userListPresenterService.userId$.subscribe((id: number) => {
      this.deleteUser.emit(id);
    })
  }

  public onDelete(id: number) {
    this.userListPresenterService.deleteUser(id)
  }

  public openUserForm() {
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
    // listen to cancel event
    componentRef.instance.cancel.subscribe((res) => {
      overlayRef.detach();
    })
    componentRef.instance.addUser.subscribe((res: UserForm) => {
      this.addUser.emit(res);
    })
  }
}
