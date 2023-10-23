import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CocktailIngredientResolver } from './cocktail-ingredient-resolver';
import { RouterTestingModule } from '@angular/router/testing';
import { CocktailService } from './cocktail.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

describe('CocktailIngredientResolverService', () => {
  let resolver: CocktailIngredientResolver;
  let cocktailServiceSpy : jasmine.SpyObj<CocktailService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CocktailService', ['getCocktailList']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ CocktailIngredientResolver, { provide: CocktailService, useValue: spy }]
    });
    resolver = TestBed.inject(CocktailIngredientResolver);
    cocktailServiceSpy = TestBed.inject(CocktailService) as jasmine.SpyObj<CocktailService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve cocktail ingredients', (done) => {
    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: (param: string) => {
          if (param === 'id') return '11000'; 
          if (param === 'Mojito') return 'Mojito'; 
          return null;
        }
      }
    } as ActivatedRouteSnapshot;

    const mockResponse = {
      drinks: [
        { idDrink: '11000',  "strDrink": "Mojito"  },
        { idDrink: '11100',  "strDrink": "Strawberry Mojito"}
      ]
    };

    cocktailServiceSpy.getCocktailList.and.returnValue(of(mockResponse));

    resolver.resolve(route).subscribe((result) => {
      expect(result).toEqual(mockResponse.drinks[0]);
      done();
    });
  });

  it('should return throw error if cocktail is not resolved', (done) => {
    const route: ActivatedRouteSnapshot = {
      paramMap: {
        get: (param: string) => {
          if (param === 'id') return '1'; 
          if (param === 'cocktailName') return 'Margarita'; 
          return null;
        }
      }
    } as ActivatedRouteSnapshot;

    const mockResponse = {
      drinks: [
        { idDrink: '2',  "strDrink": "Margarita"  },
        { idDrink: '3',  "strDrink": "Hazelnut Margarita"}
      ]
    };

    cocktailServiceSpy.getCocktailList.and.returnValue(of(mockResponse));
    resolver.resolve(route).subscribe({
      next: () => {
        fail('Expected error but got result');
        done();
      },
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('Cocktail not found');
        done();
      }
    });
});

});
