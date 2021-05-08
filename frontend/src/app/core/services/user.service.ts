import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient,  HttpEvent,  HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

import {User} from './../model/User';
// import {} from './../model/';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndPoint: string = 'http://localhost:8080/api/user';
  private httpheader = new HttpHeaders ({'Content-type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean {
    if (e.status==401 || e.status == 403){
      this.router.navigate(['/user']);
      return true;
    }
    return false
  }

  getUser(): Observable<User[]>{
    return this.http.get<User[]>(this.urlEndPoint).pipe(
      catchError(e =>{
        // this.isNoAutorizado(e);
        console.log(e)
        return throwError(e)
      })
    )
  }

  getCliente(id): Observable<User>{
    return this.http.get<User>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.error.mensaje
        })
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e)
      })
    );
  }

  create(user:  User ) : Observable<User> {
    return this.http.post(this.urlEndPoint, user, {headers: this.httpheader}).pipe(
      map((response : any) => response.cliente as User),
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status === 400){
          return throwError(e);
        }

        console.error(console.error(e.error.mensaje));
        Swal.fire('Error al crear el cliente',e.error.mensaje , 'error');
        return throwError(e);
      })
    );
  }


  updateUser(user: User): Observable<User>{
    return this.http.put(`${this.urlEndPoint}/${user.id}`, user, {headers: this.httpheader}).pipe(
      map((response : any) => response.cliente as User),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if(e.status === 400){
          return throwError(e);
        }
        console.error(console.error(e.error.mensaje));
        Swal.fire('Error al editar el user',e.error.mensaje , 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number) : Observable<User>{
    return this.http.delete<User>(`${this.urlEndPoint}/${id}`, {headers: this.httpheader}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(console.error(e.error.mensaje));
        Swal.fire('Error al eliminar ',e.error.mensaje , 'error');
        return throwError(e);
      })
    );
  }

}
