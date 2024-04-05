import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../gastos.service';
import { Gasto } from '../../interfaces/gasto.interface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styleUrls: [
    './listar-gastos.component.css'
  ]
})
export class ListarGastosComponent implements OnInit {

  title : string = 'Gastos'
  gastos: Gasto[] =[];
  paginador: any;
  valor?: number ;
  cantidad: any;

  constructor(private gastoService: GastosService ,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

       // paramMap se encarga de observar entonces se subscribe
    // esto se encarga de subscribirse a un observador
    this.activatedRoute.paramMap.subscribe((params:any)=>{
      // el operador suma convierte el string en number
      let page: number = +params.get('page')

      if (!page) {
        page = 0;
      }
          // gastos es un observador va hacer observado por observadores, aca se subscribe ,
      // y en el metodo subscribe el observador seria asignar el atributo gastos el valor
      // que se recibe del gastoservice, que seria el listado de gastos con los cambios
      this.gastoService
        .getGastosRequest(page)
        .subscribe((response) =>{
          this.gastos = response.content as Gasto[]
          this.paginador = response
        })
    }),
    this.gastoService.totalGastos().subscribe((result)=>{
      this.valor = result
    })
  }

  delete(gasto: Gasto): void {
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
        text: `¿Seguro que desea eliminar el gasto ${gasto.tipoGasto}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.gastoService.deleteGasto(gasto.id).subscribe({
            next: (response) => {
              this.gastos = this.gastos.filter((ga) => ga !== gasto);
              this.router.navigate(['/gastos']);
              swalWithBootstrapButtons.fire(
                'Gasto eliminado!',
                `Gasto de tipo ${gasto.tipoGasto} eliminado con éxito.`,
                'success'
              );
            },
            error: (err) => {
              // Aquí manejas el error
              if (err.error.mensaje) {
                // Muestra el mensaje de error usando Swal
                swalWithBootstrapButtons.fire('Error', err.error.mensaje, 'error');
              } else {
                // Si no hay mensaje de error personalizado, muestra un mensaje genérico
                swalWithBootstrapButtons.fire('Error', 'Ha ocurrido un error al eliminar el gasto.', 'error');
              }
            }
          });
        }
      });
  }

}
