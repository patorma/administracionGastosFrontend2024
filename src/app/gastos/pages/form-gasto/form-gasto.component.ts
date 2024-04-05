import { Component, OnInit } from '@angular/core';
import { Gasto, tipoGasto } from '../../interfaces/gasto.interface';
import { GastosService } from '../../gastos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-gasto',
  templateUrl: './form-gasto.component.html',
  styleUrls: ['./form.component.css']
})
export class FormGastoComponent implements OnInit  {


  gasto: Gasto={
    id: 0, // Supongamos que el id predeterminado es 0
    descripcion: '', // La descripción puede inicializarse como una cadena vacía
    fechaGasto: '', // La fecha puede inicializarse como una cadena vacía también
    tipoGasto: 'OTRO'
  };
  public titulo: string = "Crear gasto";
  public errores: string[] =[];
  tiposGasto: tipoGasto[] = ['GASTOS_COMUN', 'SUPERMERCADO', 'CASA_COMERCIAL', 'FERRETERIA', 'LEÑA', 'ROPA', 'VIAJE', 'OTRO'];

   constructor(private gastoService: GastosService,private router: Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
   this.cargarGasto()
  }

  cargarGasto(): void {
    this.activatedRoute.params.subscribe((params)=>{
      let id =params['id']
      if(id){
        this.gastoService
          .getGastosById(id)
          .subscribe((gasto)=>(this.gasto =gasto))
      }
    });

  }

  create(): void{
    this.gastoService.createGasto(this.gasto).subscribe(
          (gasto)=>{
            this.router.navigate(['/gastos'])
            Swal.fire(
              'Nuevo gasto creado!!',
              `El gasto de tipo ${gasto.tipoGasto} ha sido creado con éxito!`,
              'success'
            )
          },
        (err:any) =>{
          this.errores = err.error.errors as string[]
          console.error("Codigo del error desde el backend: " + err.status);
          console.error(err.error.errors);
          Swal.fire(
            'Error',
            'Ocurrio un error al ingreso del gasto',
            'error'
          )
        }
    )
  }

  update(): void{
    this.gastoService.updateGasto(this.gasto).subscribe(
      (response: any)=>{
        this.router.navigate(['/gastos']);
        Swal.fire(
          'Gasto actualizado',
          `${response.mensaje}: era del tipo ${response.gasto.tipoGasto}`,
          'success'
        )
      },
      (err)=>{
        this.errores = err.error.errors as string[];
       console.error("Codigo del error desde el backend: " + err.status);
       console.error(err.error.errors);
      }
    )
  }


  // el primer objeto corresponde a cada una de los tipos del ng
  // el segundo objeto es el objeto asignado al gasto y ahi hay que comparar
  /*compararTipo(o1: TipoGasto,o2: TipoGasto): boolean{
     // se compara el objeto 1 y el objeto 2
    // si es undefined se deja marcado el seleccionar con un mensaje
    if (o1  ===  undefined &&  o2  ===  undefined ){
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
    ? false
    : o1.id === o2.id;
  }*/
}
