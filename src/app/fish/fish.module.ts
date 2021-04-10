import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FishRoutingModule } from './fish-routing.module';
import { AddFishComponent } from './add-fish/add-fish.component';
import { DisplayFishComponent } from './display-fish/display-fish.component';
import { DetailFishComponent } from './detail-fish/detail-fish.component';
import { FishEffect } from './state/fish.effects';
import { fishReducer } from './state/fish.reducer';


@NgModule({
  declarations: [AddFishComponent, DisplayFishComponent, DetailFishComponent],
  imports: [
    CommonModule,
    FishRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forFeature('fish', fishReducer),
    EffectsModule.forFeature([FishEffect])
  ]
})
export class FishModule { }
