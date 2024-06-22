import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gastos',
    loadChildren: () => import('./gastos/gastos.module').then(m =>m.GastosModule)
  },
  {
    path:'gastos/page/:page',
    loadChildren: () => import('./gastos/gastos.module').then(m =>m.GastosModule)
  },
  {
    path: 'notas',
    loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
  },
  {
    path: 'notas/page/:page',
    loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
  },
  {
    path:'**',
    redirectTo: '/gastos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
