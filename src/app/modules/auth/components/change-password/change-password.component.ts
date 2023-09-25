import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from '../../models/auth.model';
import { AuthHTTPService } from '../../services/auth-http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: '',
    password: '',
  };
  changePasswordForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  errorMessage: string;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authHttpService: AuthHTTPService,
    private _authService: AuthService
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    // this.returnUrl =
    //   this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.changePasswordForm.controls;
  }

  initForm() {
    this.changePasswordForm = this.fb.group({
      currentPassword: [
        [],
        Validators.compose([
          Validators.required
        ]),
      ],
      newPassword: [
        [],
        Validators.compose([
          Validators.required
        ]),
      ],
      confirmPassword: [
        [],
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    let p = this.changePasswordForm.controls;
    if( this.changePasswordForm.controls.newPassword.value !=  this.changePasswordForm.controls.confirmPassword.value)
    {
      this.hasError = true;
      this.errorMessage = 'Password not matched';
    }
    const loginSubscr = this._authService.updatePassword(this.f.currentPassword.value, this.f.newPassword.value)
    .subscribe((data: any) =>{
      if(data == 'Success')
      {
        this.router.navigate(['/auth/logout']);
      }
      else
      {
        this.hasError = true;
        this.errorMessage = data;
      }
    })
    // const loginSubscr = this.authService
    //   .login(this.f.email.value, this.f.password.value)
    //   // .pipe(first())
    //   .subscribe((user) => {
    //     if (user) {
    //       this.router.navigate([this.returnUrl]);
    //     } else {
    //       this.hasError = true;
    //     }
    //   });
     this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

