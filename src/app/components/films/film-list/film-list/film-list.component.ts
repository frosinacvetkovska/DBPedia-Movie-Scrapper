import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsDataSource } from 'src/app/model/data-source/ds.films';
import { DbpediaService } from 'src/app/services/dbpedia-service';
import { Film } from 'src/app/model/film';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit{
  constructor(private service: DbpediaService,
              private activateRoute: ActivatedRoute,
              private router: Router) { }

   public displayedColumns = ['Poster', 'Film Name', 'Director', 'Genre'];
   public dataSource: FilmsDataSource = new FilmsDataSource(this.service);
   public showErrorTooltip : boolean[] = [];
   public loadedFilms = 0;

   ngOnInit(): void {
     this.loadedFilms = this.dataSource.loadFilms();
     for(var i =0; i<this.loadedFilms; i++){
      this.showErrorTooltip.push(false);
     }
     
   }

   
   onRowClick(filmClick: Film):void{
    this.router.navigate(['./details'],
    {relativeTo: this.activateRoute, queryParams: {filmURI: filmClick.film.value}});
   }

   setTooltip(index: number){
    this,this.showErrorTooltip[index] = true;
   }

   getFiltered(filteredFilms: Film[]): void{
    this.dataSource.loadFilteredFilms(filteredFilms);
   }
}
