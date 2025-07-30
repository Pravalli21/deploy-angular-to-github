import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], // Only import RouterOutlet for routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed typo: styleUrl -> styleUrls
})
export class AppComponent {
  title = 'users';
}