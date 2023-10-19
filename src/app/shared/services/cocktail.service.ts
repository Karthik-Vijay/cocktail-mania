import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private cocktailsData: any[] = [];

  constructor(private http: HttpClient) { }

  getCocktailList(cocktailName: string): Observable<any> {
    const httpParams = new HttpParams().set('s',cocktailName);
    const options = {params: httpParams}
    return this.http.get<any>(`${environment.cocktailBaseUrl}`, options);
  }

  getCocktailsData(): any[] {
    return this.cocktailsData;
  }

  setCocktailsData(data: any[]): void {
    this.cocktailsData = data;
  }

}
