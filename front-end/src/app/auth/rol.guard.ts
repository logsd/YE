import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RolService } from './rol.service';


@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private _rolService: RolService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this._rolService.rol() != 'ADMIN') {
        this.router.navigate(['/yaviElec']); // go to login if not authenticated
        return false;
      }
    return true;
  }
}
