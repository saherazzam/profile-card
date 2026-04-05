import { Component } from '@angular/core';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCardComponent],
  template: '<app-profile-card></app-profile-card>'
})
export class AppComponent {}