import { Component, effect, inject, input, signal } from '@angular/core';  
// Importa las utilidades necesarias de Angular para la creación de componentes y reactividad.

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';  
// Importa FormBuilder para construir formularios reactivos, ReactiveFormsModule para el soporte del formulario y Validators para validaciones.

import { TaskCreate, TaskService, Task } from '../../data-access/task.service';  
// Importa los tipos y el servicio relacionados con la gestión de tareas.

import { toast } from 'ngx-sonner';  
// Importa la librería para mostrar notificaciones.

import { Router } from '@angular/router';  
// Importa el servicio de enrutamiento para la navegación entre páginas.

@Component({
  selector: 'app-task-form',  // Define el selector del componente.
  standalone: true,  // Indica que este componente es independiente y no requiere un módulo padre.
  imports: [ReactiveFormsModule],  // Importa el módulo de formularios reactivos.
  templateUrl: './task-form.component.html',  // Especifica la plantilla HTML del componente.
  styleUrl: './task-form.component.css',  // Especifica el archivo de estilos del componente.
  providers: [TaskService],  // Proporciona una instancia local del servicio TaskService.
})
export default class TaskFormComponent {

  private _formBuilder = inject(FormBuilder);  // Inyecta FormBuilder para construir el formulario.
  private _taskService = inject(TaskService);  // Inyecta el servicio TaskService para la gestión de tareas.
  private _router = inject(Router);  // Inyecta el servicio Router para la navegación.

  loading = signal(false);  // Crea una señal reactiva para manejar el estado de carga.

  idTask = input.required<string>();  // Define una entrada requerida para el ID de la tarea.

  form = this._formBuilder.group({  // Crea un formulario reactivo con dos campos.
    title: this._formBuilder.control('', Validators.required),  // Campo 'title' obligatorio.
    completed: this._formBuilder.control(false, Validators.required),  // Campo 'completed' obligatorio, por defecto en false.
  });

  constructor() {
    effect(() => {  // Efecto reactivo que se ejecuta cuando cambia el ID de la tarea.
      const id = this.idTask();  // Obtiene el ID de la tarea.

      if (id) {
        this.getTask(id);  // Si hay un ID, obtiene los datos de la tarea.
      }
    });
  }

  async submit() {  // Método para enviar el formulario.
    if (this.form.invalid) return;  // Si el formulario es inválido, no hace nada.

    try {
      this.loading.set(true);  // Activa el estado de carga.
      const { title, completed } = this.form.value;  // Extrae los valores del formulario.
      const task: TaskCreate = {  
        title: title || '',  // Asigna el título o una cadena vacía si es nulo.
        completed: !!completed,  // Convierte el valor a booleano.
      };

      const id = this.idTask();  // Obtiene el ID de la tarea.

      if (id) {
        await this._taskService.update(task, id);  // Si hay un ID, actualiza la tarea existente.
      } else {
        await this._taskService.create(task);  // Si no hay ID, crea una nueva tarea.
      }

      toast.success(`Tarea ${id ? 'actualizada' : 'creada'} correctamente.`);  // Muestra un mensaje de éxito.
      this._router.navigateByUrl('/tasks');  // Redirige a la página de tareas.
    } catch (error) {
      toast.success('Ocurrió un problema');  // Muestra un mensaje de error.
    } finally {
      this.loading.set(false);  // Desactiva el estado de carga.
    }
  }

  async getTask(id: string) {  // Método para obtener una tarea por su ID.
    const taskSnapshot = await this._taskService.getTask(id);  // Obtiene la tarea desde Firestore.

    if (!taskSnapshot.exists()) return;  // Si la tarea no existe, no hace nada.

    const task = taskSnapshot.data() as Task;  // Convierte los datos a la estructura Task.

    this.form.patchValue(task);  // Rellena el formulario con los datos de la tarea.
  }
}
