import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Gasto} from './interfaces/gasto.interface';
import { Router } from '@angular/router';
import { DetalleGastoDTO } from './interfaces/detalle-gasto.interface';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private apiUrl: string ='http://localhost:8080/api/';

  constructor(private http: HttpClient,
                private router: Router) { }

  getGastosRequest(page: number): Observable<any>{
     return this.http.get(`${this.apiUrl}gastos/page/${page}`).pipe(
       map((response: any)=>{
        (response.content as Gasto[]).map(({descripcion,tipoGasto})=>{
          descripcion =descripcion.toUpperCase();
          //tipoGasto = tipoGasto.toUpperCase();
          console.log(descripcion )
          //console.log(tipoGasto.tipo )
          return [descripcion,tipoGasto]
        })
        return response
       })
     )
  }
// getDetalleGastoById(id:number): Observable<DetalleGastoDTO>{
//     return this.http
//                   .get<DetalleGastoDTO>(`${this.apiUrl}gastos/detalle/${id}`)
// }

  getGastosById(id: number): Observable<Gasto>{
      return this.http
                   .get<Gasto>(`${this.apiUrl}gasto/${id}`)
                   .pipe(
                      catchError((e) => {
                        if(e.status != 401 && e.error.mensaje){
                            /*capturamos el error y redirigimos a gastos*/
                         this.router.navigate(['gastos/listargastos'])
                          console.error(e.error.mensaje);
                        }
                        return throwError(()=>e);
                      })
                   )
  }

  createDetalleGastoDTO(detalle: DetalleGastoDTO):Observable<DetalleGastoDTO>{
    return this.http
               .post(`${this.apiUrl}detalleGasto`,detalle)
               .pipe(
                map((response: any)=> response.detalle as DetalleGastoDTO),
                catchError((e) =>{
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

  createGasto(gasto: Gasto): Observable<Gasto>{
    return this.http
              .post(`${this.apiUrl}gasto`,gasto)
              .pipe(
                map((response: any) =>response.gasto as Gasto ),
              catchError( (e)=>{
                 // el estado 400 viene de la validacion, un bad request
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

  updateGasto(gasto: Gasto): Observable<Gasto>{
     return this.http
               .put<Gasto>(`${this.apiUrl}gasto/${gasto.id}`,gasto)
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

  deleteGasto(id:number): Observable<Gasto>{
      return this.http
        .delete<Gasto>(`${this.apiUrl}gasto/${id}`)
        .pipe(
          catchError((e)=>{
            if(e.error.mensaje){
              console.error(e.error.mensaje);
              }
            return throwError(()=>e);
          })
        )
  }

  /*listarTiposGastos(): Observable<TipoGasto[]>{
    return this.http
              .get<TipoGasto[]>(`${this.apiUrl}gastos/tipoGastos`)
              .pipe(
                catchError(e =>{
                  return throwError(() =>e)
                })
              )
  }*/

  obtenerDetallesGastos(id: number):Observable<DetalleGastoDTO[]>{
      return this.http
                .get<DetalleGastoDTO[]>(`${this.apiUrl}gastos/detalle/${id}`)
                .pipe(
                  catchError(e =>{
                    return throwError(() =>e)
                  })
                )
  }

  subTotalGastosById(id: number): Observable<number>{
    return this.http
          .get<number>(`${this.apiUrl}gasto/subtotal/${id}`)
          .pipe(
            catchError(e =>{
              return throwError(() =>e)
            })
          )
  }

  totalGastos(): Observable<number> {
    return this.http
              .get<number>(`${this.apiUrl}gasto/total`)
              .pipe(
                catchError(e =>{
                  return throwError(()=> e)
                })
              )
  }

  deleteDetalleGasto(id: number): Observable<DetalleGastoDTO>{
    return this.http
               .delete<DetalleGastoDTO>(`${this.apiUrl}detalleGasto/${id}`)
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
