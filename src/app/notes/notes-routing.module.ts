import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarNotasComponent } from "./pages/listar-notas/listar-notas.component";


const routes: Routes=[
  {
    path: '',
    component: ListarNotasComponent
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
