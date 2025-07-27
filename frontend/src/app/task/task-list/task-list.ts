// frontend/src/app/task/task-list/task-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For ngFor, ngIf
import { TaskService } from '../../services/task'; // Import the TaskService
import { Task } from '../../services/task.model'; // Import the Task interface
import { TaskFormComponent } from '../task-form/task-form'; // Import the standalone TaskFormComponent

@Component({
  selector: 'app-task-list', // The HTML tag used to embed this component
  standalone: true, // Marks this component as standalone
  imports: [
    CommonModule,     // Make CommonModule directives available
    TaskFormComponent // Import the TaskFormComponent for use in its template
  ],
  templateUrl: './task-list.html', // Path to the component's HTML template
  styleUrls: ['./task-list.css']   // Path to the component's CSS styles
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Array to hold the list of tasks

  /**
   * Constructor for the TaskListComponent.
   * @param taskService Injects the TaskService to interact with the backend.
   */
  constructor(private taskService: TaskService) { }

  /**
   * Lifecycle hook that runs after data-bound properties are initialized.
   * Used here to load tasks when the component initializes.
   */
  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Fetches all tasks from the backend and updates the local 'tasks' array.
   */
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data; // Assign fetched data to the tasks array
      },
      error: (error) => {
        console.error('Error fetching tasks:', error); // Log any errors
        // Optionally, display an error message to the user
      }
    });
  }

  /**
   * Adds a new task to the list and sends it to the backend.
   * Called by the TaskFormComponent via the (taskAdded) output.
   * @param task The new task object to add.
   */
  addTask(task: Task) {
    this.taskService.createTask(task).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask); // Add the newly created task (with ID) to the local array
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    });
  }

  /**
   * Toggles the 'completed' status of a task and updates it on the backend.
   * @param task The task object whose completion status needs to be toggled.
   */
  toggleCompleted(task: Task) {
    // Ensure task has an ID before attempting to update
    if (task.id !== undefined) {
      // Create a new object with the toggled 'completed' status
      const updatedTask = { ...task, completed: !task.completed };
      this.taskService.updateTask(task.id, updatedTask).subscribe({
        next: (data) => {
          // Find the index of the updated task in the local array
          const index = this.tasks.findIndex(t => t.id === data.id);
          if (index > -1) {
            this.tasks[index] = data; // Update the task in the local array
          }
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    }
  }

  /**
   * Deletes a task from the list and the backend.
   * @param id The ID of the task to delete.
   */
  deleteTask(id: number | undefined) {
    // Ensure task has an ID before attempting to delete
    if (id !== undefined) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          // Filter out the deleted task from the local array
          this.tasks = this.tasks.filter(task => task.id !== id);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }
}

