import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListPresentationComponent } from './user-container/user-list-presentation/user-list-presentation.component';
import { UserService } from './user.service';
import { UserContainerComponent } from './user-container/user-container.component';
import { UserFormPresentationComponent } from './user-container/user-form-presentation/user-form-presentation.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    UserContainerComponent,
    UserListPresentationComponent,
    UserFormPresentationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    OverlayModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
