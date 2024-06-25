import { Component, OnInit } from '@angular/core';
import { Nota } from '../../interfaces/nota.interface';
import { NotasService } from '../../services/notas.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'listar-notas',
  templateUrl: './listar-notas.component.html',
  styles: [
  ]
})
export class ListarNotasComponent implements OnInit{

    title : string = 'Notas';
    notas: Nota[] = [];
    paginador: any;

    constructor(private notaService:NotasService, private activatedRoute: ActivatedRoute,
      private router: Router){}

      ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params:any)=>{
          let page: number = +params.get('page')
          if (!page) {
            page = 0;
          }
          this.notaService
                        .getNotasRequest(page)
                        .subscribe((response)=>{
                          this.notas = response.content as Nota[]
                          this.paginador = response
                        })
        })
      }

      delete(nota: Nota): void {
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
          text: `¿Seguro que desea eliminar la nota ${nota.titulo}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true,
        })
         .then((result)=>{
          if (result.value){
             this.notaService.deleteNota(nota.id).subscribe({
               next: (response) =>{
                this.notas = this.notas.filter((ga)=> ga !== nota);
                this.router.navigate(['/notas']);
                swalWithBootstrapButtons.fire(
                  'Nota eliminada!',
                  `Nota de titulo ${nota.titulo} eliminada con éxito.`,
                    'success'
                );
               },
               error:(err) => {
                 // Aquí manejas el error
              if (err.error.mensaje) {
                // Muestra el mensaje de error usando Swal
                swalWithBootstrapButtons.fire('Error', err.error.mensaje, 'error');
              } else {
                // Si no hay mensaje de error personalizado, muestra un mensaje genérico
                swalWithBootstrapButtons.fire('Error', 'Ha ocurrido un error al eliminar la nota.', 'error');
              }
               }
             })
          }
         })
      }
}
