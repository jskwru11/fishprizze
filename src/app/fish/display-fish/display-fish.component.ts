import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FishService } from './../fish.service';

@Component({
  selector: 'app-display-fish',
  templateUrl: './display-fish.component.html',
  styleUrls: ['./display-fish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayFishComponent implements OnInit {
  errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  
  fish$ = this.fishService.fish$.pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );


  constructor(private libarary: FaIconLibrary, private fishService: FishService, private router: Router) { }

  ngOnInit(): void {
    this.libarary.addIconPacks(fas);
    this.libarary.addIconPacks(far);
    this.libarary.addIconPacks(fab);
  }

  onEdit(id: string) {
    console.log(`you are in edit mode...`, id);
    this.fishService.editSelected(id);
    this.router.navigate(['fish',id]);
  }

  onDelete(id: string) {
    console.log(`you are in delete mode...`, id);
    this.fishService.deleteFish(id).subscribe(
      res => {
        console.log(`fish deleted successfully: ${res}`);
      }
    )
  }

}
