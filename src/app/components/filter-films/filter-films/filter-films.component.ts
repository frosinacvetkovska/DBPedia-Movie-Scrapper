import { Component, OnInit } from '@angular/core';
import { FilterDto } from 'src/app/model/dto/dto.filter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Film } from 'src/app/model/film';
import { DbpediaService } from 'src/app/services/dbpedia-service';
@Component({
  selector: 'app-filter-films',
  templateUrl: './filter-films.component.html',
  styleUrls: ['./filter-films.component.scss']
})
export class FilterFilmsComponent implements OnInit{
  @Output() filmsFiltered = new EventEmitter<Film[]>();
  @Output() size = new EventEmitter<number>();

  public isLoadingResults: boolean = false;

  public filterDto: FilterDto;
  public filterForm: FormGroup = new FormGroup({});
  public minValue = 50;
  public maxValue = 5000;

  constructor(private fb: FormBuilder,
              private dbpediaService: DbpediaService) {
                this.filterDto = {
                  sortBy: '',
                  resultsCount: 50,
                  searchKeyWord: '',
                };
            
                this.filterForm = this.fb.group({
                  sortByControl: [''],
                  resultsCountControl: [this.minValue],
                  searchKeyWordControl: [''],
                });
              }

  ngOnInit(): void {
    this.initFilterForm();
  }

  private initFilterForm(): void {
    this.filterForm = this.fb.group({
      sortByControl: [''],
      resultsCountControl: [this.minValue],
      searchKeyWordControl: [''],

    });
  }

  public filter(): void {
    this.filterDto = {
      sortBy: this.filterForm.get("sortByControl")?.value,
      resultsCount: this.filterForm.get("resultsCountControl")?.value,
      searchKeyWord: this.filterForm.get("searchKeyWordControl")?.value,

    };

    this.isLoadingResults = true;
    this.dbpediaService.getFilteredFilms(this.filterDto)
      .subscribe((result) => {
        this.filmsFiltered.emit(result.results.bindings);
        this.size.emit(result.results.bindings.length);
        this.isLoadingResults = false;
      });
  }

}
