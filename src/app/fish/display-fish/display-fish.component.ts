import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { EMPTY, Subject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { FishService } from './../fish.service';
import * as FromFishState from './../state/fish.reducer';
import * as FishActions from './../state/fish.actions';
import { Fish } from '../../models/fish.model';

@Component({
  selector: 'app-display-fish',
  templateUrl: './display-fish.component.html',
  styleUrls: ['./display-fish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayFishComponent implements OnInit {
  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  fish$: Observable<Fish[]>;


  constructor(
    private libarary: FaIconLibrary,
    private fishService: FishService,
    private router: Router,
    private store: Store<FromFishState.State>) { }

  ngOnInit(): void {
    this.libarary.addIconPacks(fas);
    this.libarary.addIconPacks(far);
    this.libarary.addIconPacks(fab);

    this.store.dispatch(FishActions.loadFish());

    this.fish$ = this.store.select(FromFishState.getFish);
  }

  onEdit(id: string) {
    this.store.dispatch(FishActions.setCurrentFish({fishId: id}))
    this.router.navigate(['fish',id]);
  }

  onDelete(id: string) {
    this.store.dispatch(FishActions.deleteFish({fishId: id}));
  }

}
