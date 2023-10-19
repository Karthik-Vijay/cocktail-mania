import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapsed = true;
  
  constructor(private route: ActivatedRoute) {}

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}
