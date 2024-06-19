import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarGastosComponent } from "./pages/listar-gastos/listar-gastos.component";
import { ByGastoComponent } from "./pages/by-gasto/by-gasto.component";
import { FormGastoComponent } from "./pages/form-gasto/form-gasto.component";
import { PageComponent } from "./components/paginador-gastos/paginador-gastos.component";
import { FormDetalleComponent } from "./pages/form-detalle/form-detalle.component";
import { FormAsignarGastoComponent } from "./pages/form-asignar-gasto/form-asignar-gasto.component";


const routes: Routes=[
  {
    path: '',
    component: ListarGastosComponent
  },
  {
    path: 'bygasto/:id',
    component: ByGastoComponent
  },

  {
    path: 'formgasto',
    component: FormGastoComponent
  },
  {
    path: 'formgasto/:id',
    component: FormGastoComponent
  },
  {
    path: '',
    component: PageComponent
  },
  {
    path: 'formdetallegasto',
    component: FormDetalleComponent
  },
  {
    path:'formdetallegasto/:id',
    component: FormDetalleComponent
  },
  {
    path: 'formasignagasto/:id',
    component: FormAsignarGastoComponent
  }
  // {
  //   path:'**',
  //   redirectTo: 'listargastos'
  // }

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class GastosRoutingModule { }
