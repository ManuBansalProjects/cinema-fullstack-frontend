import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from './components/shows/shows.component';
import { AddEditShowComponent } from './components/add-edit-show/add-edit-show.component';

const routes: Routes = [
  {path: '', component: ShowsComponent},
  {path: 'addshow', component: AddEditShowComponent},
  {path: 'editshow/:showid', component: AddEditShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowsRoutingModule { }
