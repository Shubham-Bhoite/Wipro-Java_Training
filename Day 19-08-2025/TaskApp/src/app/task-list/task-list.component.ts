import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Output() taskAdded = new EventEmitter<{ description: string; category: string }>();

  description = '';
  category = '';

  addTask() {
    if (this.description && this.category) {
      this.taskAdded.emit({ description: this.description, category: this.category });
      this.description = '';
      this.category = '';
    }
  }
}
