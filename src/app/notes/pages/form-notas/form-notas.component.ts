import { Component, OnInit } from '@angular/core';
import { Nota } from '../../interfaces/nota.interface';
import { NotasService } from '../../services/notas.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-notas',
  templateUrl: './form-notas.component.html',
  styleUrls: [
    './form-notas.component.css'
  ]

})
export class FormNotasComponent implements OnInit  {

  nota: Nota ={
    id: 0,
    titulo: '',
    contenido: '',
    fechaNota: ''
  }
  public title: string = "Crear una nota";
  public errores: string[] =[];

  constructor(private notaService:NotasService,private router: Router,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.cargarNota()
  }
  cargarNota():void{
    this.activatedRoute.params.subscribe((params)=>{
      let id =params['id']
      if(id){
        this.notaService
                  .getNotasById(id)
                  .subscribe((nota)=> (this.nota = nota))
      }
    });
  }

  create(): void{
    this.notaService.createNota(this.nota).subscribe(
       (nota) =>{
        this.router.navigate(['/notas'])
        Swal.fire(
          'Nuevo nota creada!!',
          `La nota de título ${nota.titulo} ha sido creada con éxito!!`,
          'success'
        )
       },
       (err:any) =>{
        this.errores = err.error.errors as string[]
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
        Swal.fire(
          'Error',
          'Ocurrio un error al ingreso de la nota',
          'error'
        )
      }
    )
  }

  update(): void{
    this.notaService.updateNota(this.nota).subscribe(
      (response: any) =>{
        this.router.navigate(['/notas']);
        Swal.fire(
          'Nota Actualizada',
           `${response.mensaje}: Nueva nota creada!!`,
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
}
