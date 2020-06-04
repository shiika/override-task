import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})

export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(
        route: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.$user.pipe(
            map(
                (user: {email: string; username: string}) => {
                    if (!!user) {
                        return true;
                    } else {
                        // return false;
                        return this.router.createUrlTree(['/login']);
                    }

                }
            )
        )
    }
}