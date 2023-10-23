
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture,fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailListComponent } from './cocktail-list.component';
import { of } from 'rxjs';
import { CocktailService } from '../../../shared/services/cocktail.service';

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let cocktailServiceMock: jasmine.SpyObj<CocktailService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CocktailService', ['getCocktailList']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [CocktailListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ cocktailName: 'Mojito' }) } },
        { provide: Router, useValue: {} },
        { provide: CocktailService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
    cocktailServiceMock = TestBed.inject(CocktailService) as jasmine.SpyObj<CocktailService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load cocktail details and apply filter on successful API call', fakeAsync(() => {
    const mockData = { drinks: [{ strDrink: 'Mojito' }, { strDrink: 'Mojito Extra' }] };
    cocktailServiceMock.getCocktailList.and.returnValue(of(mockData));
    component.ngOnInit();
    tick();
    expect(component.cocktails).toEqual(mockData.drinks);
  }));

});
