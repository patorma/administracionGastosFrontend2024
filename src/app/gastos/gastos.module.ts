import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ByGastoComponent } from './pages/by-gasto/by-gasto.component';
import { PageComponent } from './components/paginador-gastos/paginador-gastos.component';
import { FormGastoComponent } from './pages/form-gasto/form-gasto.component';
import { ListarGastosComponent } from './pages/listar-gastos/listar-gastos.component';
import { GastosRoutingModule } from './gastos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormDetalleComponent } from './pages/form-detalle/form-detalle.component';
import { FormAsignarGastoComponent } from './pages/form-asignar-gasto/form-asignar-gasto.component';

registerLocaleData(localeEs,'es')//importar esto para cambiar el idioma a español

@NgModule({
  declarations: [
    ByGastoComponent,
    PageComponent,
    FormGastoComponent,
    ListarGastosComponent,
    FormDetalleComponent,
    FormAsignarGastoComponent,


  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    SharedModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  // exports:[
  //   PageComponent
  // ],
  providers:[{provide: LOCALE_ID, useValue: 'es'}]
})
export class GastosModule { }
