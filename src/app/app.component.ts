import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit,Inject,PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { LoggingService2 } from './logging.Service';
import { AuthProject } from './Shared/auth-project.service';
import { obsService } from './Shared/observable.service';
import * as fromApp from './Shared/store/app.reducer'
import * as fromAuthActions from './Shared/store/auth.actions'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'AppProject';
  showRecepi = true;
  showList = false;
  value = 2;
  obsActivate = false;
  Activesubscription: Subscription;

  constructor(private obsService: obsService, private auth: AuthProject, private loggingService: LoggingService2,
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID)private platformId) { }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new fromAuthActions.AutoLogin());
    }

    this.Activesubscription = this.obsService.activatedEmitter.subscribe(didActivate => {
      this.obsActivate = didActivate;
      this.loggingService.printLog('Hello  from app component ngOnInit');
    });
  
  }
  ngOnDestroy(): void {
    this.Activesubscription.unsubscribe();
  }
  

  recipeClicked(clicked: boolean) {
    if (this.showRecepi == false &&  this.showList== true) {
      this.showRecepi = !this.showRecepi
      this.showList = !this.showList
    }
    
  }
  shoppingClicked (clicked2: boolean) {
    if (this.showList == false &&  this.showRecepi== true) {
      this.showRecepi = !this.showRecepi
      this.showList = !this.showList
    }
    
  }
}

