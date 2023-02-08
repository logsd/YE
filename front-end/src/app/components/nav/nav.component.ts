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
    const admin1: any = document.getElementById("admin1");
    const admin2: any = document.getElementById("admin2");
    const admin3: any = document.getElementById("admin3");
    const admin4: any = document.getElementById("admin4");

    if (this._rolService.rol() != 'ADMIN') {
      admin1.style.display = 'none';
      admin2.style.display = 'none';
      admin3.style.display = 'none';
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
