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

  @Input()
  public gastoid: any;

  public titulo: string = "Ingresar producto";
  public errores: string[] =[];
  public id: number=0;
  public detalleGasto: DetalleGastoDTO ={
    id: 0,
    precio: 0, // Valor inicial numérico
    subtotal: 0, // Valor inicial numérico
    cantidad: 0, // Valor inicial numérico
    producto: '',
    gasto: {
      id: 0,
      descripcion: '',
      tipoGasto: 'OTRO',
      fechaGasto: ''
    }

  }
  constructor(private gastoService: GastosService,private router: Router,
    private activatedRoute:ActivatedRoute){

  }
  ngOnInit():void {
    this.detalleGasto.gasto.id = this.activatedRoute.snapshot.params['id'];
  }

   createDetalle(): void{
    this.gastoService.createDetalleGastoDTO(this.detalleGasto).subscribe(
      (detalle)=>{
        this.router.navigate(['/gastos/bygasto', this.detalleGasto.gasto.id ])
        Swal.fire(
          'Detalle del gasto creado!!',
          `El detalle del gasto ha sido creado con éxito!`,
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
}
