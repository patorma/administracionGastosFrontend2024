import { Component } from '@angular/core';
import { Autor } from './interfaces/autor.interface';

@Component({
  selector: 'footer-gasto',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public autor: Autor ={nombre: 'Patricio',apellido: 'Contreras'}
}
