import {Routes} from "@angular/router";

export default [ //loadComponent (cargar componentes de forma dinámica) en lugar de importar el componente directamente, lo carga solo cuando el usuario accede a la ruta
    {
        path: 'sing-in',
        loadComponent: () => import('./sing-in/sing-in.component'),
    },
    {
        path: 'sing-up',
        loadComponent: () => import('./sing-up/sing-up.component'),
    }
] as Routes; //Se usa para indicar que este array sigue la estructura esperada por Routes de Angular. 