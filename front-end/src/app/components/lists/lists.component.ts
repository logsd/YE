import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [ListService]
})
export class ListsComponent implements OnInit {

  constructor(public listService: ListService) { }

  ngOnInit(): void {
    this.getLists()
  }

  estado2 = true;
  addList(form: NgForm){
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
}
