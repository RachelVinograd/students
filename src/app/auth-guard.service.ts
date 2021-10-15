import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  authenticated: boolean = false;

  constructor(private _router: Router) { }

  canActivate(): boolean {
    if (this.authenticated)
      return true;
    this._router.navigate(["/login"]);
  }
}
