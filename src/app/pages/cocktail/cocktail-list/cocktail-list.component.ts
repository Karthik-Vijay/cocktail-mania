import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { CocktailService } from '../../../shared/services/cocktail.service';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss'],
})
export class CocktailListComponent implements OnInit {
  private readonly destroy: DestroyRef = inject(DestroyRef);
  cocktailName: string = '';
  cocktails: any[] = [];
  filteredCocktails: any[] = [];
  error: any;
  filterType: string = 'All';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cockTailService: CocktailService
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntilDestroyed(this.destroy)).subscribe((params: any) => {
      if (params['cocktailName']) {
        this.cocktailName = params['cocktailName'];
        this.loadCocktailDetails();
      }
    });

  }

  loadCocktailDetails(): void {
    this.cockTailService
      .getCocktailList(this.cocktailName).pipe(takeUntilDestroyed(this.destroy))
      .subscribe( {
        next : (data: any) => {
          this.cocktails = data.drinks;
          this.applyFilter();
        },
        error: (e: any) => {
          this.error = e}
      }
 );
  }

  applyFilter(): void {
    if (this.filterType === 'All') {
      this.filteredCocktails = [...this.cocktails];
    } else {
      this.filteredCocktails = this.cocktails.filter(
        (cocktail) => cocktail.strAlcoholic === this.filterType
      );
    }
  }

  setFilter(filter: string): void {
    this.filterType = filter;
    this.applyFilter();
  }
  

  goToDetails(cocktail: any): void {
    const cocktailName = this.route.snapshot.paramMap.get('cocktailName');
    const cocktailId = cocktail.idDrink; 
    this.router.navigate(['/cocktails',cocktailName, cocktailId, 'ingredients']);
  }
}
