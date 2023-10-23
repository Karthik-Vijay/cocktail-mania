import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { IngredientMeasureModel } from 'src/app/shared/models/ingredient-measure.model';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss']
})
export class IngredientDetailsComponent implements OnInit{
  private readonly destroy: DestroyRef = inject(DestroyRef);
  ingredientsWithMeasures: IngredientMeasureModel[] = [];
  cocktail: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.pipe(takeUntilDestroyed(this.destroy)).subscribe((data: any) => {
      this.cocktail = data.cocktail;
    });
    this.ingredientsWithMeasures = this.getIngredientsWithMeasures(this.cocktail);
  }

  private getIngredientsWithMeasures(cocktail: any): IngredientMeasureModel[] {
    const ingredientsWithMeasures = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail?.[`strIngredient${i}`];
      const measure = cocktail?.[`strMeasure${i}`];
      if (ingredient) {
        ingredientsWithMeasures.push({ ingredient, measure });
      }
    }
  
    return ingredientsWithMeasures;
  }

}
