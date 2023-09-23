import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFilmsComponent } from './filter-films.component';

describe('FilterFilmsComponent', () => {
  let component: FilterFilmsComponent;
  let fixture: ComponentFixture<FilterFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterFilmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
