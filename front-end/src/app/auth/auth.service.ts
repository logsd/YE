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
    const token: any = localStorage.getItem('token'); // get token from local storage
    if (!token) {
      this.router.navigate(['/login']);
    }
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    console.log(payload);
    return parsedPayload // check if token is expired
  }

}
