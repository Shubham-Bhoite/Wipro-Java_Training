import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskComponent } from '../task/task.component';
import { Task } from '../task';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, TaskListComponent, TaskComponent],  
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks: Task[] = [];
  nextId = 1;

  onTaskAdded(task: { description: string; category: string }) {
    this.tasks.push({
      id: this.nextId++,
      description: task.description,
      category: task.category
    });
  }

  onTaskDeleted(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
