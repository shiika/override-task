import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from "rxjs/operators";

export interface ResPayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: BehaviorSubject<{}> = new BehaviorSubject<{}>(null);
  username: string;
  userId: number;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  signIn(email: string, password: string) {
    return this.http
      .post<ResPayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAfKHO4K6HHHKhKzq4byaMTuAD9rKNgXA',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  signUp(email: string, password: string) {
    return this.http
      .post<ResPayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAfKHO4K6HHHKhKzq4byaMTuAD9rKNgXA',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this))
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errMessage = 'An unknown error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This email already exists!';

      case 'INVALID_PASSWORD':
        errMessage = 'Invalid password was entered!';
    }

    return throwError(errMessage);
  }

  logout() {
    this.$user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(resData: ResPayload) {
    this.autoLogout(+resData.expiresIn * 1000);
    this.http.get("https://jsonplaceholder.typicode.com/users?id=1").pipe(take(1))
      .subscribe(
        user => {
          this.username = user[0].username;
          this.userId = user[0].id;
          this.$user.next({email: resData.email, username: this.username});
          this.router.navigate(["/panel", "posts", "all"], {relativeTo: this.route});
        });
  }
}
