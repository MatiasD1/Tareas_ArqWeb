import { Component, inject, signal } from '@angular/core';  // Importa las utilidades necesarias de Angular para la creación de componentes y la inyección de dependencias.
import { TableComponent } from '../../ui/table/table.component';  // Importa el componente de tabla, que se usará para mostrar la lista de tareas.
import { RouterLink } from '@angular/router';  // Importa RouterLink para permitir la navegación entre páginas mediante enlaces.
import { TaskService } from '../../data-access/task.service';  // Importa el servicio TaskService, que gestiona la obtención y manipulación de tareas.

@Component({
  selector: 'app-task-list',  // Define el selector del componente.
  standalone: true,  // Indica que este componente es independiente y no requiere un módulo padre.
  imports: [TableComponent, RouterLink],  // Importa el componente de tabla y la directiva de enlaces de Angular.
  templateUrl: './task-list.component.html',  // Especifica la plantilla HTML del componente.
  providers: [TaskService],  // Proporciona una instancia local del servicio TaskService.
})
export default class TaskListComponent {

  tasksService = inject(TaskService);// Inyecta el servicio TaskService para acceder a la lista de tareas y sus funcionalidades.
  tasks = signal(this.tasksService.getTasks());

  deleteTask(id: string) {
    this.tasksService.deleteTask(id)
      .then(() => {
        console.log('Task deleted successfully');
        // Actualizar la lista de tareas eliminando la tarea con el id correspondiente
        this.tasks.set(this.tasks().filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  }
}