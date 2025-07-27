// frontend/src/app/task/task-form/task-form.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel (two-way data binding)
import { CommonModule } from '@angular/common'; // Provides common directives like ngIf, ngFor
import { Task } from '../../services/task.model'; // Import the Task interface

@Component({
  selector: 'app-task-form', // The HTML tag used to embed this component
  standalone: true, // Marks this component as standalone
  imports: [
    FormsModule,   // Make FormsModule available for template-driven forms
    CommonModule   // Make CommonModule directives available
  ],
  templateUrl: './task-form.html', // Path to the component's HTML template
  styleUrls: ['./task-form.css']   // Path to the component's CSS styles
})
export class TaskFormComponent {
  // Initialize a new Task object for the form input
  newTask: Task = { title: '', description: '', completed: false };

  // EventEmitter to emit the new task data to the parent component
  @Output() taskAdded = new EventEmitter<Task>();

  /**
   * Handles the form submission.
   * Emits the new task if the title is not empty.
   */
  onSubmit() {
    // Basic validation: ensure title is not just whitespace
    if (this.newTask.title.trim()) {
      // Emit a copy of the new task to the parent component
      this.taskAdded.emit({ ...this.newTask });
      // Reset the form fields after submission
      this.newTask = { title: '', description: '', completed: false };
    }
  }
}

