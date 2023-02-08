import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  isLoggedIn() {
    const token: any = localStorage.getItem('ACCESS_TOKEN');
/*
    if (!token) {
      alert('Debe iniciar sesion ')
    }*/
    return token;
  }

}
