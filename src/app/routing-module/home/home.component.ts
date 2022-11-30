import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'browserslist';
import { interval, Observable, observable, Observer, Subscribable, Subscription } from 'rxjs';
import { map,filter } from 'rxjs/operators';

import { AuthService } from 'src/app/auth.service';
import { obsService } from 'src/app/Shared/observable.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private obsService: obsService) { }
  private firstObsSubscription: Subscription;

  ngOnInit() {
    // this.firstObsSubscription=interval(1000).subscribe((x: number) => {
    //   console.log(x)
    // })

    //Costum observable
    // This is just an example of how observable works. This is useful to manage Angular observables
    const customIntervalObservable = new Observable((observer:Observer<number>)=> {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 5){
          observer.complete(); // Completing an observable
        }
        if (count > 3) {// If an error occurs the obeservavble complete won't work as it has been cancelled 
          observer.error(new Error('Count is greater than 3'))
        }
        count++;
      
      }, 1000);
      
    });

    //Operators

    customIntervalObservable.pipe(map(data => {
      return 'Round'+(data + 1);
    }))
    // applied to the subscribe below



    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
   }),map(data => {
    return 'Round'+(data + 1);
  })).subscribe((data) => {
     console.log(data)
        
   }, error => {
     alert(error.message)//handling an error 
   }, () =>
   {
     console.log('Completed!!')// logging the observable comoplete/ Here we can do some clean up 
    })
  }
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  
  }
  onServer() {
    this.router.navigate(['servers'], { relativeTo: this.route })
    console.log(this.route)
    
  }
  onUsers() {
    this.router.navigate(['users'], { relativeTo: this.route })
    console.log(this.route)
    
  }

  onLoadServer(id: number) {
    this.router.navigate(['servers', id, 'edit'], { queryParams: { allowEdit: '1' }, fragment: 'loading' });
  }

  onLogin() {
    this.authService.logIn();
  }
  
  onLogout() {
    this.authService.logOut();
  }
  
  onActivate() {
    // this.obsService.activatedEmitter.emit(true); using emitter
    this.obsService.activatedEmitter.next(true);
  }
}
