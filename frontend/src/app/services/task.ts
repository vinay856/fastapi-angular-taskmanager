// frontend/src/app/services/task.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs'; // Import Observable for asynchronous data streams
import { Task } from '../services/task.model'; // <--- ADDED THIS LINE: Import the Task interface

@Injectable({
  providedIn: 'root' // This makes the service a singleton and available throughout the application
})
export class TaskService {
  // Base URL for your FastAPI backend tasks endpoint
  private apiUrl = 'http://localhost:8000/tasks';

  /**
   * Constructor for the TaskService.
   * @param http Injects the HttpClient to perform HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches all tasks from the backend.
   * @returns An Observable that emits an array of Task objects.
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Fetches a single task by its ID from the backend.
   * @param id The ID of the task to retrieve.
   * @returns An Observable that emits a single Task object.
   */
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new task on the backend.
   * @param task The Task object to create (without an ID).
   * @returns An Observable that emits the newly created Task object (with ID).
   */
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  /**
   * Updates an existing task on the backend.
   * @param id The ID of the task to update.
   * @param task The updated Task object.
   * @returns An Observable that emits the updated Task object.
   */
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  /**
   * Deletes a task from the backend.
   * @param id The ID of the task to delete.
   * @returns An Observable that emits nothing upon successful deletion.
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

