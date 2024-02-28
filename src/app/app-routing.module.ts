import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridViewComponent } from './grid-view/grid-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

const routes: Routes = [
  { path: '', component: GridViewComponent },
  { path: 'pokemon/:id', component: DetailViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
