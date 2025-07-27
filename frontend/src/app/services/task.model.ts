// frontend/src/app/task/task.model.ts

/**
 * Defines the structure for a Task object.
 * 'id' is optional for new tasks as it's assigned by the backend.
 */
export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
}