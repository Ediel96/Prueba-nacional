import { User } from './../../../core/model/User';
import { Component, OnInit ,Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UserAcademy } from 'src/app/core/model/UserCademy';
import { UserAcademyService } from '../../../core/services/user-academy.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css']
})
export class AcademyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userAcademy : UserAcademyService, private router: Router) { }

  @Input() userAcademics : UserAcademy [];
  @Input() idUser : any;
  id : User;
  errores : string[];

  registerForm: FormGroup;
  submitted = false;

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      namber: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onSubmit(id : number) {

    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    this.userAcademy.create(this.registerForm.value , id).subscribe( res =>{

      // this.router.navigate(['/user/form/', id])
      location.reload();
      swal.fire('Nuevo Usuario', ` creado con exito!`  , 'success');
      },err =>{
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }

  delete(userAcademic: UserAcademy):void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.userAcademy.delete(userAcademic.id).subscribe(
          response => {
            this.userAcademics = this.userAcademics.filter( cli => cli !== userAcademic);
          }
        )
        swalWithBootstrapButtons.fire(
          'Usuario Eliminado!!',
          'success'
        )
      }
    })
  }


}
