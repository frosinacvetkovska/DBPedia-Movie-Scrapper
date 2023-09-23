import { Film } from "../film";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { DbpediaService } from "src/app/services/dbpedia-service";
import { FilmResponse } from "../film-response";

export class FilmsDataSource implements DataSource<Film>{

    private filmSubject = new BehaviorSubject<Film[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalElementsSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public totalElements$ = this.totalElementsSubject.asObservable();
    
    constructor(private filmService: DbpediaService){}

    connect(collectionViewer: CollectionViewer): Observable<readonly Film[]> {
     return this.filmSubject.asObservable();   
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.filmSubject.complete();
        this.loadingSubject.complete();
        this.totalElementsSubject.complete();
    }

    setLoading(isLoading : boolean){
        this.loadingSubject.next(isLoading);
    }

    loadFilms() : number{
        this.loadingSubject.next(true);
        this.filmService.getFilms().subscribe(
            (result: FilmResponse) => {
                let filmResult: Film[] = result.results.bindings;
                this.filmSubject.next(filmResult);
                this.totalElementsSubject.next(filmResult.length);
                this.loadingSubject.next(false);
            }
        );
        return this.totalElementsSubject.value;
    }

    

    loadFilteredFilms(filteredFilms: Film[]) :number{
        this.loadingSubject.next(true);
        this.filmSubject.next(filteredFilms);
        this.totalElementsSubject.next(filteredFilms.length);
        this.loadingSubject.next(false);
        return filteredFilms.length;
    }
}