import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../data-access/task.service'; 
import { RouterModule } from '@angular/router'; // 👈 Se importa RouterModule, no RouterLink

@Component({
  selector: 'app-table', 
  standalone: true, 
  imports: [RouterModule], // 👈 Importa RouterModule en lugar de RouterLink
  templateUrl: './table.component.html',
}) 
export class TableComponent {
  @Input() tasks: Task[] = []; // ✅ Corrección
  @Output() deleteTask = new EventEmitter<string>(); 

  onDeleteTask(id: string) {
    this.deleteTask.emit(id);
  }
}
