import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CocktailIngredientResolver } from './cocktail-ingredient-resolver';

describe('CocktailIngredientResolverService', () => {
  let service: CocktailIngredientResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CocktailIngredientResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
