import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {LoginService}  from '../../services/login.service';
import {User} from '../../models/user';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  constructor(private loginService: LoginService, private router: Router) { 

  }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    this.loading = true;

      this.loginService.login(form.value).subscribe({
        next: data =>{
        this.router.navigateByUrl('/dashboard');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sesion Iniciada con exito',
          showConfirmButton: false,
          timer: 1500
        })
        },
        error: (e:HttpErrorResponse)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email / pass incorrectos!',
           
          })
          this.loading = false
        }
      });
}

}
