/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { authService } from '../auth/auth.service';

@Injectable()
export class route_guardService implements CanActivate {
    constructor(private auth: authService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.auth.isUserAuthenticated(route);
    }

}
