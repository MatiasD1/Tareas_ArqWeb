import { Injectable, inject, signal } from '@angular/core';  // Importa decorador y utilidades para inyección de dependencias y señales reactivas.
import { Firestore, collection, addDoc, collectionData, doc, getDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';  // Importa métodos para interactuar con Firestore.
import { toSignal } from '@angular/core/rxjs-interop';  // Convierte un Observable en una señal reactiva.
import { catchError, Observable, tap, throwError } from 'rxjs';  // Importa operadores para manejo de errores y efectos secundarios en RxJS.
import { AuthStateService } from '../../shared/data-access/auth-state.service';  // Importa el servicio de autenticación.

export interface Task {  // Define la estructura de una tarea.
  id: string;  // Identificador único de la tarea.
  title: string;  // Título de la tarea.
  completed: boolean;  // Estado de completado de la tarea.
}

export type TaskCreate = Omit<Task, 'id'>;  // Define un tipo sin el campo "id", útil para crear nuevas tareas.

const PATH = 'tasks';  // Ruta de la colección en Firestore.

@Injectable()  // Indica que esta clase es un servicio inyectable.
export class TaskService {

  private _firestore = inject(Firestore);  // Inyecta el servicio Firestore para acceder a la base de datos.
  private _authState = inject(AuthStateService);  // Inyecta el servicio de autenticación para obtener el usuario actual.
  private _collection = collection(this._firestore, PATH);  // Referencia a la colección "tasks" en Firestore.
  private _query = query(  // Crea una consulta en Firestore.
    this._collection,  
    where('userId', '==', this._authState.currentUser?.uid)  // Filtra las tareas para obtener solo las del usuario autenticado.
  );
  loading = signal<boolean>(true);  // Crea una señal reactiva para indicar si los datos están cargando.

  getTasks = toSignal((collectionData(this._query, { idField: 'id' }) as Observable<Task[]>).pipe(  // Convierte los datos de Firestore en una señal reactiva.
    tap(() => {  // Ejecuta una acción secundaria cuando se reciben los datos.
      this.loading.set(false);  // Cambia la señal "loading" a false cuando se cargan los datos.
    }),
    catchError(error => {  // Maneja posibles errores en la carga de datos.
      this.loading.set(false);  // Asegura que "loading" sea false incluso si ocurre un error.
      return throwError(() => error);  // Retorna el error para su manejo posterior.
    })
  ), { initialValue: [] }  // Inicializa la señal con un array vacío.
  );

  constructor() {
    console.log(this._authState.currentUser);  // Imprime el usuario autenticado en la consola.
  }

  getTask(id: string) {  // Obtiene una tarea específica por su ID.
    const docRef = doc(this._collection, id);  // Crea una referencia al documento en Firestore.
    return getDoc(docRef);  // Obtiene los datos del documento.
  }

  create(task: TaskCreate) {  // Crea una nueva tarea en Firestore.
    return addDoc(this._collection, { ...task, userId: this._authState.currentUser?.uid });  // Agrega la tarea a la colección con el ID del usuario.
  }

  update(task: TaskCreate, id: string) {  // Actualiza una tarea existente.
    const docRef = doc(this._collection, id);  // Crea una referencia al documento en Firestore.
    return updateDoc(docRef, { ...task, userId: this._authState.currentUser?.uid });  // Actualiza la tarea en Firestore.
  }

  deleteTask(id: string) {
    const docRef = doc(this._collection, id);
    return deleteDoc(docRef).catch(error => {
      console.error('Error deleting task:', error);
      return throwError(() => error);
    });
  }
  
}
