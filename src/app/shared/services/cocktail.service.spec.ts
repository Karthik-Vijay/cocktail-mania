import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CocktailService } from './cocktail.service';
import { HttpClient } from '@angular/common/http';

describe('CocktailService', () => {
  let injector: TestBed;
  let service: CocktailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient,CocktailService]
    });
    injector = getTestBed();
    service = injector.get(CocktailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve margarita cocktails', () => {
    const mockCocktails = {
      drinks: [
        { idDrink: '1', strDrink: 'Margarita' },
        { idDrink: '2', strDrink: 'Blue Margarita' }
      ]
    };
    service.getCocktailList('Margarita').subscribe( (data: any) => {
      expect(data).toEqual(mockCocktails);
    });
    const req = httpMock.expectOne('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita');
    expect(req.request.method).toBe('GET');
    req.flush(mockCocktails);
  });

  it('getCocktailsData should return the stored data', () => {
    const testData = [{ id: 1, name: 'Margarita' }, { id: 2, name: 'Mojito' }];
    service.setCocktailsData(testData);
    const result = service.getCocktailsData();
    expect(result).toEqual(testData);
  });

  it('setCocktailsData should set the provided data', () => {
    const testData = [{ id: 1, name: 'Margarita' }, { id: 2, name: 'Mojito' }];
    service.setCocktailsData(testData);

    const result = service.getCocktailsData();

    expect(result).toEqual(testData);
  });

});

