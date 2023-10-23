import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientDetailsComponent } from './ingredient-details.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('IngredientDetailsComponent', () => {
  let component: IngredientDetailsComponent;
  let fixture: ComponentFixture<IngredientDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [IngredientDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {data : of({ cocktailName: 'Mojito' })} },
        { provide: Router, useValue: {} }
      ],
    });
    fixture = TestBed.createComponent(IngredientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
