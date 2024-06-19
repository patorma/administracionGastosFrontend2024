import { Component, Input, OnInit } from '@angular/core';
import { DetalleGastoDTO } from '../../interfaces/detalle-gasto.interface';
import { GastosService } from '../../gastos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-detalle-gasto',
  templateUrl: './form-detalle.component.html',
  styleUrls:  ['./form-detalle.component.css'
  ]
})
export class FormDetalleComponent implements OnInit {

  // @Input()
  // public gastoid: any;

  public titulo: string = "Ingresar producto";
  public errores: string[] =[];
  // public id: number=0;
  public detalle: DetalleGastoDTO ={
    id: 0,
    cantidad:0,
    precio: 0,
    producto: '',
    subtotal: 0,
    gasto: {
      id: 0,
      descripcion: '',
      fechaGasto: '',
      tipoGasto:'OTRO'
    }
  }
  constructor(private gastoService: GastosService,private router: Router,
    private activatedRoute:ActivatedRoute){

  }
  ngOnInit():void {
   this.cargarDetalle()
   this.detalle.gasto.id  = this.activatedRoute.snapshot.params['id'];
  }

  cargarDetalle(): void {
    this.activatedRoute.params.subscribe(
      (params)=>{
        let id =+params['id']
        if(id){
          this.gastoService.getDetalleGastoById(id).subscribe(
            (detalle)=>  this.detalle = detalle
          )
        }


      }
    )
  }

   createDetalle(): void{
    this.gastoService.createDetalleGastoDTO(this.detalle).subscribe(
      (detalle)=>{
        this.router.navigate(['/gastos/bygasto', this.detalle.gasto.id ])
        Swal.fire(
          'Detalle del gasto creado!!',
          `El detalle ${detalle} del gasto ha sido creado con éxito!`,
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

   update():void {
    this.gastoService.updateDetalleGasto(this.detalle).subscribe(
      (response: any)=>{

        this.router.navigate(['/gastos/bygasto',this.detalle.gasto.id])

        Swal.fire(
               'Detalle del gasto actualizado',
                 `${response.mensaje}: era el producto ${response.detalle.producto}`,
                 'success'
               )
      },
      (err)=>{
            this.errores = err.error.errors as string[];
           console.error("Codigo del error desde el backend: " + err.status);
            console.error(err.error.errors);
           }

    )
    // this.gastoService.updateDetalleGasto(this.detalleGasto).subscribe({
    //   next: (response:any) =>{
    //     this.router.navigate(['/gastos/bygasto',this.detalleGasto.gasto.id])
    //     Swal.fire(
    //       'Detalle del gasto actualizado',
    //       `${response.mensaje}: era el producto ${response.detalleGasto.producto}`,
    //       'success'
    //     )
    //   },
    //   error: (err)=>{
    //     this.errores = err.error.errors as string[];
    //    console.error("Codigo del error desde el backend: " + err.status);
    //    console.error(err.error.errors);
    //   }
    // })
   }
}
