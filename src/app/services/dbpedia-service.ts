import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FilmResponse } from "../model/film-response";
import { Queries } from "./queries";
import { Observable } from 'rxjs';
import { FilmProperties } from "../model/film-properties-response";
import { FilterDto } from "../model/dto/dto.filter";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class DbpediaService {
    constructor(private http: HttpClient){}

    getFilms() : Observable<FilmResponse>{
        return this.http.get<FilmResponse>
        ("https://dbpedia.org/sparql?query=" +
        encodeURIComponent(Queries.GET_FILMS) +
        "&format=json");
    }

    getFilmDetailsByURI(filmURI: string) : Observable<FilmProperties>{
        return this.http.get<FilmProperties>
        ("https://dbpedia.org/sparql?query=" +
        encodeURIComponent(Queries.GET_FILM_DETAILS_BY_URI(filmURI)) +
        "&format=json");
    }

    getFilteredFilms(filterDto: FilterDto) : Observable<FilmResponse>{
        return this.http.get<FilmResponse>
        ("https://dbpedia.org/sparql?query=" +
        encodeURIComponent(Queries.GET_FILTERED_FILMS(filterDto)) +
        "&format=json");
    }

    getFilmDetailsFromWikiData(uri: string) : Observable<FilmProperties>{
        const headerDictionary = {
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': '*'
        }

        const options = {
            headers: new HttpHeaders(headerDictionary)
        }

        return this.http.get<FilmProperties>("https://query.wikidata.org/sparql?query=" + encodeURIComponent(Queries.GET_FILM_DETAILS_FROM_WIKIDATA(uri)), options);
    }
}