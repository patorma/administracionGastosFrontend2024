import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarNotasComponent } from "./pages/listar-notas/listar-notas.component";
import { FormNotasComponent } from "./pages/form-notas/form-notas.component";


const routes: Routes=[
  {
    path: '',
    component: ListarNotasComponent
  },
  {
    path: 'formnotas',
    component: FormNotasComponent
  },
  {
    path: 'formnotas/:id',
    component:FormNotasComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class NotesRoutingModule{}
