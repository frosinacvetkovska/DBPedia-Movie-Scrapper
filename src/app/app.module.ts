import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MaterialModule } from './material.module';
import { FilmDetailsComponent } from './components/films/film-details/film-details/film-details.component';
import { FilmListComponent } from './components/films/film-list/film-list/film-list.component';
import { FilterFilmsComponent } from './components/filter-films/filter-films/filter-films.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmDetailsComponent,
    FilmListComponent,
    FilterFilmsComponent
  ],
  imports: [
   BrowserModule,
   AppRoutingModule,
   HttpClientModule,
   BrowserAnimationsModule,
   MaterialModule,
   ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
