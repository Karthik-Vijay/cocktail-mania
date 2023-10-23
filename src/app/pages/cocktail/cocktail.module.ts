import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { IngredientDetailsComponent } from './ingredient-details/ingredient-details.component';
import { CocktailIngredientResolver } from '../../shared/services/cocktail-ingredient-resolver';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: ':cocktailName', component: CocktailListComponent, pathMatch: 'full' },
  { path: ':cocktailName/:id/ingredients', component: IngredientDetailsComponent, pathMatch: 'full', resolve: { cocktail: CocktailIngredientResolver } },
  { path: '', component: HomeComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [CocktailIngredientResolver]
})
export class CocktailModule { }
