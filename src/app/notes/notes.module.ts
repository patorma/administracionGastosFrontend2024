import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListarNotasComponent } from './pages/listar-notas/listar-notas.component';
import { PaginadorNotasComponent } from './components/paginador-notas/paginador-notas.component';



@NgModule({
  declarations: [
    ListarNotasComponent,
    PaginadorNotasComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    SharedModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class NotesModule { }
