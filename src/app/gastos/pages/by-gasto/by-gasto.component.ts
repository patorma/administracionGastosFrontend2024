import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../gastos.service';
import { ActivatedRoute } from '@angular/router';
import { DetalleGastoDTO } from '../../interfaces/detalle-gasto.interface';
import { Gasto } from '../../interfaces/gasto.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'by-gasto',
  templateUrl: './by-gasto.component.html',
  styleUrls: ['./by-gasto.component.css']
})
export class ByGastoComponent implements OnInit {

  //public gastoid: number =0;
  public detalleGastoDTO: DetalleGastoDTO[] = [];
  public valor: number = 0;
  public gasto!: Gasto;
  public gastoid: number =0; // para enviar id de gasto a form de detalle
  public title: string = 'Detalle del gasto';
  public nombreGasto: string ='';

  constructor(private gastoService: GastosService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params) => {
    //  let id= +params['id'];// se usa el + para transformar params['id'] de un string a number
    //  console.log( typeof(this.gastoid))

        this.cargarDetalleGasto();
        //this.actualizarValorTotal();


    };


  cargarDetalleGasto(): void {
    this.activatedRoute.params.subscribe(
      (params) =>{
        let id =+params['id']
        console.log(id)
        if(id){
          this.gastoService.obtenerDetallesGastos(id).subscribe(
            (detalle)=>{
              this.detalleGastoDTO = detalle
            }
          )
        }
        this.verGasto(id);
        this.actualizarValorTotal(id)
      }
    )
    // this.gastoService.obtenerDetallesGastos(id).subscribe((detalle) => {
    //   this.detalleGastoDTO = detalle;
    // });

  }

  verGasto(id:number): void {// implementar en el html ver el gasto que se le asigana el detalle
    this.gastoService.getGastosById(id).subscribe((gasto) => {
      this.gasto = gasto;
      console.log(id)
      this.nombreGasto = this.gasto.descripcion
      this.gastoid =gasto.id
    });
  }

  actualizarValorTotal(id:number): void {
    this.gastoService.subTotalGastosById(id).subscribe({
      next: (total) => {
        this.valor = total;
      },
      error: (err) => {
        console.error('Error al obtener el subtotal:', err);
        this.valor = 0; // Asigna 0 o cualquier valor predeterminado en caso de error
      }
    });
}

  deleteDetalleGasto(detalle: DetalleGastoDTO): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Está seguro?',
        text: `¿Seguro que desea eliminar ${detalle.producto} del detalle de gasto?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.gastoService.deleteDetalleGasto(detalle.id).subscribe({
            next: () => {
              this.detalleGastoDTO = this.detalleGastoDTO.filter((dt) => dt !== detalle);
              swalWithBootstrapButtons.fire(
                'Detalle del gasto eliminado!!',
                `El producto ${detalle.producto} fue eliminado con éxito`,
                'success'
              );
              // Actualizar el valor total después de eliminar un detalle
              this.actualizarValorTotal(this.gastoid );
            },
            error: (err) => {
              if (err.error.mensaje) {
                swalWithBootstrapButtons.fire('Error', err.error.mensaje, 'error');
              } else {
                swalWithBootstrapButtons.fire('Error', 'Ha ocurrido un error al eliminar el producto del detalle de gasto.', 'error');
              }
            }
          });
        }
      });
  }
}
