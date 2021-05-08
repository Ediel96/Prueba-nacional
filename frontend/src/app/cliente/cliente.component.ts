import { HashLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/services/user.service';
import swal from 'sweetalert2';

import {User} from '../core/model/User'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private userSer : UserService) { }

  users : User [];

  ngOnInit(): void {
      this.userSer.getUser().subscribe(resp =>{
        this.users = resp
      })
  }

  delete(user: User):void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el usuario ${user.firstName} ${user.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.userSer.delete(user.id).subscribe(
          response => {
            this.users = this.users.filter( cli => cli !== user);
          }
        )

        swalWithBootstrapButtons.fire(
          'Usuario Eliminado!!',
          `El usuario ${user.firstName} eliminado con exito!.`,
          'success'
        )
      }
    })
  }

}
