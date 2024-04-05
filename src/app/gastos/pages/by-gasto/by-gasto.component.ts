import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../gastos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleGastoDTO } from '../../interfaces/detalle-gasto.interface';
import { Gasto } from '../../interfaces/gasto.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'by-gasto',
  templateUrl: './by-gasto.component.html',
  styleUrls:['./by-gasto.component.css']

})
export class ByGastoComponent implements OnInit {

  public detalleGastoDTO : DetalleGastoDTO [] = []
  public valor: number = 0;
  gasto: Gasto = {id: 0, // Supongamos que el id predeterminado es 0
  descripcion: '', // La descripción puede inicializarse como una cadena vacía
  fechaGasto: '', // La fecha puede inicializarse como una cadena vacía también
  tipoGasto: 'OTRO'};

  public title: string = 'Detalle del gasto'
  constructor(private gastoService: GastosService,private router: Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.cargarDetalleGasto(),
    this.activatedRoute.params.subscribe((params)=>{
      let id =params['id']
      if(id){
        this.gastoService.subTotalGastosById(id)
               .subscribe((total)=> this.valor = total )
      }
    })

  }

 cargarDetalleGasto(): void{
  this.activatedRoute.params.subscribe((params)=>{
    let id =params['id']
    if(id){
      this.gastoService
         .obtenerDetallesGastos(id)
         .subscribe((detalle)=>this.detalleGastoDTO = detalle)
    }
  }),
  this.verGasto()
 }

 verGasto():void{
  this.activatedRoute.params.subscribe((params)=>{
    let id =params['id']
    if(id){
      this.gastoService
         .getGastosById(id)
         .subscribe((gasto) =>this.gasto = gasto)
    }
  })
 }

 deleteDetalleGasto(detalle: DetalleGastoDTO): void{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
  .fire({
    title: 'Está seguro?',
        text: `¿Seguro que desea elimina ${detalle.producto} del detalle de gasto?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
  })
  .then((result)=>{
    if (result.value) {
      this.gastoService.deleteDetalleGasto(detalle.id).subscribe({
        next: ()=>{
          this.detalleGastoDTO = this.detalleGastoDTO.filter((dt)=> dt != detalle);
          this.router.navigate(['/gastos']);
          swalWithBootstrapButtons.fire(
            'Detalle del gasto elimando!!',
            `El producto ${detalle.producto} fue eliminado con éxito`,
            'success'
          )
        },
        error: (err) =>{
              // Aquí manejas el error
              if (err.error.mensaje) {
                // Muestra el mensaje de error usando Swal
                swalWithBootstrapButtons.fire('Error', err.error.mensaje, 'error');
              } else {
                // Si no hay mensaje de error personalizado, muestra un mensaje genérico
                swalWithBootstrapButtons.fire('Error', 'Ha ocurrido un error al eliminar el producto del detalle de gasto.', 'error');
              }

        }
      })
    }
  })
 }


}
