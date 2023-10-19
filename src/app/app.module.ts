import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CocktailListComponent } from './pages/cocktail/cocktail-list/cocktail-list.component';
import { HomeComponent } from './pages/home/home.component';
import { IngredientDetailsComponent } from './pages/cocktail/ingredient-details/ingredient-details.component';
import { HttpErrorInterceptor } from './shared/interceptors/server-error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CocktailListComponent,
    HeaderComponent,
    IngredientDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
