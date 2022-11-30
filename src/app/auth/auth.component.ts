
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthProject } from '../Shared/auth-project.service';
import { AlertComponent} from '../shared/alert/alert.component'
import { placeHolder } from '../Shared/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../Shared/store/app.reducer'
import * as fromAuthActions from '../Shared/store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export  class AuthComponent implements OnInit, OnDestroy {
  isLogInMode = false;
  loading = false;
  error: string = null;
  userCreated: string = null;

  private storeSub: Subscription
  @ViewChild(placeHolder) alertHost: placeHolder;

  private closeSub: Subscription;
  
  constructor(//private auth: AuthProject, Changed with the use of NGRX
    //private router: Router, Changed with the use of NGRX
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }
  
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    
  }

  ngOnInit(): void {
    // this.auth.autoLogin();
   this.storeSub= this.store.select('auth').subscribe(authState => {
     this.loading = authState.loading
    
      this.error = authState.authError
      if (this.error) {
        this.showErrorAlert(this.error);
      }
      
    });
   
  }

  switchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  handleError() {
    this.store.dispatch(new fromAuthActions.ClearError());
  }

  onSubmit(form: NgForm) {
  
    if (!form.valid) {
      return alert('Invalid Sign up Form!')
    }


    
    if (this.isLogInMode) {
      //authObs = this.auth.logIn(form.value.email, form.value.password); 
      this.store.dispatch(
        new fromAuthActions.LoginStart({ email:form.value.email, password: form.value.password })
      )
    } else {
      // console.log(form.value.email, 'and', form.value.password)
      this.store.dispatch(new fromAuthActions.SignupStart({ email: form.value.email, password: form.value.password }));
    }



    // authObs.subscribe(
    //   resData => {
    //     console.log(resData)
    //     this.loading = false;
    //     this.router.navigate(['']);
      
    //   },
    //   errorMessage => {
    //     this.error = errorMessage;
    //     console.log(errorMessage)
    //     this.showErrorAlert(errorMessage);
    //     this.loading = false;
    //   }
    // );
    
    form.reset();
  }

 private showErrorAlert(message: string) {
    // How to load a component programatically
    // Another alternative with dynamic loading components is commented in the HTML component 
   
  const alertComponentFactory= this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
   const hostViewContainerRef = this.alertHost.viewContainerRef;
   hostViewContainerRef.clear();

   const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
   
   componentRef.instance.message = message;
   this.closeSub=componentRef.instance.close.subscribe(() => {
     this.closeSub.unsubscribe();
     hostViewContainerRef.clear();
   });


  
  }
}
