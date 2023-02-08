import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolService } from 'src/app/auth/rol.service';

import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private _loginService: LoginService,
    private router: Router,
    private _rolService: RolService,
  ) { }



  ngOnInit(): void {
    this.rol()
  }

  rol(){
    const user: any = document.getElementById("usuarios");
    const list: any = document.getElementById("list");


    if (this._rolService.rol() != 'ADMIN') {
      list.style.display = 'none';
      user.style.display = 'none';
      //alert('No mostrar cosas de admin') // go to login if not authenticated
      return false;
    }
    return true
  }

  logOut(){
    this._loginService.logOut();
    this.router.navigate(['/login']);
  }

}
