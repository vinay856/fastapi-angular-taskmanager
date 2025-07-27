// frontend/src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Provides common directives like ngIf, ngFor
import { RouterOutlet } from '@angular/router'; // Only needed if you use Angular's routing

// Import the standalone TaskListComponent directly
import { TaskListComponent } from './task/task-list/task-list';

@Component({
  selector: 'app-root', // The HTML tag used to embed this component in index.html
  standalone: true,     // Marks this component as standalone
  imports: [
    CommonModule,     // Make CommonModule directives available
    RouterOutlet,     // Include RouterOutlet if you use routing (optional for this app)
    TaskListComponent // <--- Import TaskListComponent here to use it in the template
  ],
  templateUrl: './app.html', // Path to the component's HTML template
  styleUrls: ['./app.css']   // Path to the component's CSS styles
})
export class AppComponent {
  title = 'Task Manager'; // A simple title for the application
}

