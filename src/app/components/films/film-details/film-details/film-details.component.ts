import { Component, OnInit } from '@angular/core';
import { DbpediaService } from 'src/app/services/dbpedia-service';
import { Film } from 'src/app/model/film';
import {ActivatedRoute, Router} from "@angular/router";
import { FilmProperties } from 'src/app/model/film-properties-response';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  isLoading = false;
  filmURI: string = '';
  filmProperties: Film[] = [];
  imageNotAvailableOnDbpedia = false;

  constructor(private service: DbpediaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.filmURI = params['filmURI'];
        if(this.filmURI !== '') {
          this.loadBookByURI(this.filmURI);
        }
      });
  }

  loadBookByURI(filmURI: string): void {
    this.service.getFilmDetailsByURI(filmURI)
      .subscribe((result: FilmProperties) => {
        this.filmProperties = result.results.bindings;
        this.isLoading = false;
        var sameAsFilmURI = this.filmProperties[0].wikiDataEntity.value;
        this.service.getFilmDetailsFromWikiData('<' + sameAsFilmURI + '>').subscribe(
          res => {
            // show the data in the template
          }
        )
      });
  }

  showTooltip() {
    this.imageNotAvailableOnDbpedia = true;
  }
}
