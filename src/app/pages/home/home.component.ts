import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cocktailNames = ['Mojito', 'Margarita'];

  constructor() {}

  cocktailImageSources: { [key: string]: string } = {
    'Mojito': 'assets/mojito.webp',
    'Margarita': 'assets/margarita.webp'
  };

}
