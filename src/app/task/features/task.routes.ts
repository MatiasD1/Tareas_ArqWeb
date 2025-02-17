import {Routes} from "@angular/router"; 
// Se importa el tipo Routes desde Angular Router para definir las rutas de la aplicación.

export default [
    {
        path: '', 
        loadComponent: () => import('./task-list/task-list.component'),
    },
    {
        path: 'new',
        loadComponent: () => import('./task-form/task-form.component'),
    },
    {
        path: 'edit/:idTask',
        loadComponent: () => import('./task-form/task-form.component'),
    },
] as Routes; 
// Se exportan las rutas que serán utilizadas por el enrutador de Angular.
// Cada ruta está asociada a una componente mediante lazy loading (carga diferida).
