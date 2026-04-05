import { Component } from '@angular/core';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}