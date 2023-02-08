import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service'
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  addUser(form: NgForm){
    if(form.value._id){
      this.userService.putUser(form.value)
        .subscribe(res =>{

          this.resetForm(form)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Actualizado Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getUsers()

        })
    } else {
      this.userService.postUser(form.value)
      .subscribe({
        next:res => {
        this.resetForm(form)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getUsers()
      },
      error : (e:HttpErrorResponse)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario ya existe!',

        })
      }
      })
    }
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(res => {
        this.userService.users =res as User[];
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = new User();
    }
  }

  editUser(user: User){
    this.userService.selectedUser = user;
  }

  deleteUser(_id:string){
    Swal.fire({
      title: 'Estas seguro de eliminar este usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.deleteUser(_id)
      .subscribe(res =>{
        this.getUsers();
      });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Usuario no eliminado', '', 'info')
      }
    })

  }



}
