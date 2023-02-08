import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private router: Router
  ) { }

  rol() {
    const token: any = localStorage.getItem('ROL'); // get token from local storage
    if (!token) {
      alert('Usted no tiene permiso');
    }
    /*
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload // check if token is expired*/
    return token;
  }
}
