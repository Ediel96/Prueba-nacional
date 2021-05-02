
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient,  HttpEvent,  HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { TypeDocument} from '../model/TypeDocument'

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {

  constructor(private http: HttpClient, private router: Router) { }

  private urlEndPoint: string = 'http://localhost:8080/api/type_document';
  private httpheader = new HttpHeaders ({'Content-type' : 'application/json'});

  getTypeDocument(): Observable<TypeDocument[]>{
    return this.http.get<TypeDocument[]>(this.urlEndPoint).pipe(
      catchError(e =>{
        // this.isNoAutorizado(e);
        return throwError(e)
      })
    )
  }
}
