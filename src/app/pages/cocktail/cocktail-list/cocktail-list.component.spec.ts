
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailService } from 'src/app/shared/services/cocktail.service';
import { CocktailListComponent } from './cocktail-list.component';

describe('CocktailListComponent', () => {
  let injector: TestBed;
  let cocktailService: CocktailService;
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [CocktailListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
        CocktailService
      ],
    });
    injector = getTestBed();
    cocktailService = injector.get(CocktailService);
    fixture = TestBed.createComponent(CocktailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
