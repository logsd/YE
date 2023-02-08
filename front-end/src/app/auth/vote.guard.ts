import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { VoteService } from './vote.service';

@Injectable({
  providedIn: 'root'
})
export class VoteGuard implements CanActivate {
  constructor(private _voteService: VoteService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this._voteService.afterVote()  == 'true') {
        alert('Usted ya voto')
        this.router.navigate(['/']); // go to login if not authenticated
        return false;
      }
    return true;
  }

}
