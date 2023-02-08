import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';



@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private router: Router,
    private _loginSErvice: LoginService
  ) { }

  afterVote(){
    const state: any = localStorage.getItem('STATE');
    console.log(state);
    if(state == 'true'){
      alert('Usted ya voto ya no puede volver a votar')
      this._loginSErvice.logOut();
    }
    return state

  }
}
