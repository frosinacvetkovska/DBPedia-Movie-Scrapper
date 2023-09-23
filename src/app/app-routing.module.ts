import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './components/films/film-list/film-list/film-list.component';
import { FilmDetailsComponent } from './components/films/film-details/film-details/film-details.component';

const routes: Routes = [
  { path: 'films', component: FilmListComponent },
  { path: 'films/details', component: FilmDetailsComponent },
  { path: '', redirectTo: '/films', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
