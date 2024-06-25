import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Nota } from '../interfaces/nota.interface';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private apiUrl: string ='http://localhost:8080/api/';
  constructor(private http: HttpClient,
    private router: Router) { }

  getNotasRequest(page:number): Observable<any>{
      return this.http.get(`${this.apiUrl}notas/page/${page}`).pipe(
        map((response: any)=>{
          (response.content as Nota[]).map(({titulo,contenido})=>{
            titulo = titulo.toUpperCase();
            console.log(titulo)
            return [titulo,contenido]
          })
          return response
        })
      )

  }

  getNotasById(id: number): Observable<Nota>{
    return this.http
                   .get<Nota>(`${this.apiUrl}nota/${id}`)
                   .pipe(
                    catchError((e) => {
                      if(e.status != 401 && e.error.mensaje){
                          /*capturamos el error y redirigimos a gastos*/
                          this.router.navigate(['notas'])
                          console.error(e.error.mensaje);
                      }
                      return throwError(()=>e);
                    })
                   )
  }

  createNota(nota:Nota): Observable<Nota>{
    return this.http.
                    post(`${this.apiUrl}nota`,nota)
                    .pipe(
                      map((response: any) => response.nota as Nota),
                      catchError((e)=>{
                        if (e.status === 400){
                          return throwError(() =>e);
                        }
                        if(e.error.mensaje){
                          console.error(e.error.mensaje);
                        }
                        return throwError(() =>e);
                      })
                    )
  }
  updateNota(nota: Nota):  Observable<Nota>{
    return this.http
                  .put<Nota>(`${this.apiUrl}nota/${nota.id}`,nota)
                  .pipe(
                    catchError((e)=>{
                      if (e.status === 400) {
                        return throwError(() =>e);
                      }
                      if(e.error.mensaje){
                        console.error(e.error.mensaje);
                        }
                        return throwError(()=>e);
                    })
                   )
  }

  deleteNota(id: number):  Observable<Nota>{
    return this.http
                  .delete<Nota>(`${this.apiUrl}nota/${id}`)
                  .pipe(
                    catchError((e)=>{
                      if(e.error.mensaje){
                        console.error(e.error.mensaje);
                        }
                      return throwError(()=>e);
                    })
                  )
  }
}
