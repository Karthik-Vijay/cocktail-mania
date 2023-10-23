import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CocktailService } from './cocktail.service';
import { Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailIngredientResolver {
  constructor(private cocktailService: CocktailService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const cocktailId = route.paramMap.get('id');
    const cocktailName: any = route.paramMap.get('cocktailName');
    return this.cocktailService.getCocktailList(cocktailName).pipe(
      map((response: any) => {
        const selectedCocktail = response.drinks.find((cocktail: any) => cocktail.idDrink === cocktailId);
        if (!selectedCocktail) {
          throw new Error('Cocktail not found');
        }
        return selectedCocktail;
      })
    );
  }
}
