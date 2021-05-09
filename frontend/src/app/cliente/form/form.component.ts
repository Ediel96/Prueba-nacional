import { UserAcademy } from './../../core/model/UserCademy';
// import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { UserService } from '../../core/services/user.service';
import { TypeDocumentService } from '../../core/services/type-document.service';
import { UserAcademyService } from './../../core/services/user-academy.service';

import {User} from '../../core/model/User';
import { TypeDocument } from 'src/app/core/model/TypeDocument';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  errores : string[];
  registerForm: FormGroup;
  submitted = false;
  user : User = new User();
  idUser : number;

  typeDocuments : TypeDocument[];
  userAcademics : UserAcademy[];
  trueAcademi : any;

  constructor(private formBuilder: FormBuilder, private userSer : UserService, private userAcademy : UserAcademyService,
    private router : Router, private activatedRoute : ActivatedRoute, private typeDocuServ:TypeDocumentService) { }

    ngOnInit(): void {

      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        andress :['', Validators.required],
        documentNumber :['', Validators.required],
        dateOfBirth: ['', [Validators.required]],
        typeDocument: ['', [Validators.required]],
      });

    this.cargarUser();
    this.typeDocuServ.getTypeDocument().subscribe(typeDocuments => this.typeDocuments  = typeDocuments);

  }


  updateUser():void{
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    this.registerForm.value.id = this.user.id;
    this.user = this.registerForm.value;
    this.userSer.updateUser(this.user)
    .subscribe( res =>{
      this.router.navigate(['/user'])
      console.log(res)
      swal.fire('Usuario Actualizado', `El Usuario actualizado con exito!`  , 'success');
      },err =>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    this.userSer.create(this.registerForm.value).subscribe(
      res =>{
        this.router.navigate(['/user'])
        swal.fire('Nuevo Usuario', `Usario ${res.lastName} creado con exito!`  , 'success');
      },err =>{
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
}

  cargarUser():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.userSer.getCliente(id).subscribe(
          (user)=> this.user = user
        )
      }
      if(id){
        this.userAcademy.getUserAcademy(id).subscribe(userAcademic => {
          this.userAcademics = userAcademic, this.trueAcademi = true,
          this.idUser = id;
          console.log('id',id)
          console.log(this.userAcademics)
        })
      }
    })
  }

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
