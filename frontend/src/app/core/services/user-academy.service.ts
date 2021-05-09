import { UserAcademy } from './../model/UserCademy';
import {User} from '../model/User'

import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient,  HttpEvent,  HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserAcademyService {

  private urlEndPoint: string = 'http://localhost:8080/api/user_academy';
  private httpheader = new HttpHeaders ({'Content-type' : 'application/json'});


  constructor(private http: HttpClient, private router: Router) { }

  getUserAcademy(id:number): Observable<UserAcademy[]>{
    return this.http.get<UserAcademy[]>(`${this.urlEndPoint}/${id}`).pipe(
      map((response : any) => response.user as UserAcademy[]),
      catchError(e =>{
        // this.isNoAutorizado(e);
        console.log(e)
        return throwError(e)
      })
    )
  }

  create(user_academy: UserAcademy, id: number) : Observable<UserAcademy> {

    return this.http.post( `${this.urlEndPoint}/${id}` , user_academy, {headers: this.httpheader}).pipe(
      map((response : any) => response.user as UserAcademy),
      catchError(e => {
        if(e.status === 400){
          return throwError(e);
        }
        console.error(console.error(e.error.mensaje));
        Swal.fire('Error al crear el cliente',e.error.mensaje , 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number) : Observable<User>{
    return this.http.delete<User>(`${this.urlEndPoint}/${id}`, {headers: this.httpheader}).pipe(
      catchError(e => {
        // if(this.isNoAutorizado(e)){
          return throwError(e);
        }

      )
    );
  }


}
