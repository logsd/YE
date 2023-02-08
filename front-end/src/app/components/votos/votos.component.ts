import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service'
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css'],
  providers: [ListService, UserService]
})
export class VotosComponent implements OnInit {
  constructor(public listService: ListService, public userService:UserService,private router: Router,
     public _loginService: LoginService) { }

  ngOnInit(): void {
    this.storageUser()
    this.getLists()
  }
  estado2 = true;
  addList(form: any){
    if(form.value._id){
      this.listService.putList(form.value)
        .subscribe(res =>{
          this.resetForm(form)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Lista Actualizada Correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.getLists()

        })
    } else {
      this.listService.postList(form.value)
      .subscribe({
        next : res => {
        this.resetForm(form)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Lista creada exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getLists()
      },
      error : (e:HttpErrorResponse)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La lista ya existe!',

        })
      }
      })
    }
  }



  votar(list: List){
    const a = this._loginService.getUser();
    a.state = 'true';


    list.votos ++;
    const lista = {
      _id: list._id,
      nombre : list.nombre,
      descripcion : list.descripcion,
      foto: list.foto,
      votos : list.votos,
    }
    Swal.fire({
      title: 'Estas seguro de votar por esta lista?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Votar',
      denyButtonText: `No Votar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.listService.putList(lista)
        .subscribe(res =>{
        this.getLists()
    })
        Swal.fire('Usted a votado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Usted no a votado', '', 'info')
      }
    })
    this._loginService.logOut();
    console.log(a);
  }

  getLists(){
    this.listService.getLists()
      .subscribe(res => {
        this.listService.lists =res as List[];
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.listService.selectedList = new List();
    }
  }

  editList(list: List){
    this.listService.selectedList = list;
  }

  deleteList(_id:string){
    Swal.fire({
      title: 'Estas seguro de eliminar esta lista?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.listService.deleteList(_id)
      .subscribe(res =>{
        this.getLists();
      });
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Lista no eliminada', '', 'info')
      }
    })

  }

  storageUser(){
    const userId = localStorage.getItem('User');
    console.log(userId);
  }
}
