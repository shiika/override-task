import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  isLoading: boolean = false;


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  switchLogin() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.isLoading = true;
    let $authRequest: Observable<{}> = this.isLogin ? this.authService.signIn(email, password) : this.authService.signUp(email, password);

    $authRequest.subscribe(
      res => {
        this.isLoading = false;
        
      }
    )
  }

}
