import { Component } from '@angular/core';
import { DetalleGastoDTO } from '../../interfaces/detalle-gasto.interface';
import { GastosService } from '../../gastos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-asignar-gasto',
  templateUrl: './form-asignar-gasto.component.html',
  styleUrls: ['./form-asignar-gasto.component.css']
})
export class FormAsignarGastoComponent {
  public titulo: string = "Ingresar producto";
  public errores: string[] =[];
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

    this.detalle.gasto.id  = this.activatedRoute.snapshot.params['id'];
   }

   createDetalle(): void{
    this.gastoService.createDetalleGastoDTO(this.detalle).subscribe(
      (detalle) =>{
        this.router.navigate(['/gastos/bygasto', this.detalle.gasto.id ])
        Swal.fire(
          'Detalle del gasto creado!!',
          `El detalle  ${detalle.producto} ha sido creado con éxito!`,
          'success'
        )
      },
      (err:any) =>{
        this.errores = err.error.errors as string[]
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
        Swal.fire(
          'Error',
          'Ocurrio un error al ingreso del producto del gasto',
          'error'
        )
      }

    )
   }



}
