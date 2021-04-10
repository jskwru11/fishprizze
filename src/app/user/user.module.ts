import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { DisplayUserComponent } from './display-user/display-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';


@NgModule({
  declarations: [AddUserComponent, DisplayUserComponent, DetailUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    EffectsModule.forFeature([])
  ]
})
export class UserModule { }
