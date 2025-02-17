import { inject } from "@angular/core"; // Importa la función inject para obtener dependencias en funciones.
import { CanActivateFn, Router } from "@angular/router";// Importa CanActivateFn para definir guards y Router para la navegación.
import { AuthStateService } from "../shared/data-access/auth-state.service";// Importa el servicio de autenticación.
import { map } from "rxjs"; // Importa la función map de RxJS para transformar valores en un observable.

export const privateGuard  = (): CanActivateFn => {// Define una función que devuelve un guard para rutas privadas.
    return () => {// Devuelve la función que Angular ejecutará para determinar si se puede activar la ruta.
        
        const router = inject(Router);// Obtiene una instancia del Router.
        const authState = inject(AuthStateService); // Obtiene una instancia del servicio de autenticación.


        return authState.authState$.pipe(// Accede al estado de autenticación como un observable.
            map((state) => {// Transforma el estado de autenticación.
                if(!state){// Si el usuario NO está autenticado...
                    router.navigateByUrl('auth/sing-in');// Redirige a la página de inicio de sesión.
                    return false;// Bloquea el acceso a la ruta.
                }
                return true;// Permite el acceso si el usuario está autenticado
            })
        );
    };
};

export const publicGuard  = (): CanActivateFn => {// Define un guard para rutas públicas.
    return () => {// Devuelve la función que Angular ejecutará para determinar si se puede activar la ruta.
        const router = inject(Router);// Obtiene una instancia del Router.
        const authState = inject(AuthStateService);// Obtiene una instancia del servicio de autenticación.

        return authState.authState$.pipe(// Accede al estado de autenticación como un observable.
            map((state) => {// Transforma el estado de autenticación.
                console.log(state);// Muestra el estado en la consola (para depuración).
                if(state){// Si el usuario está autenticado...
                    router.navigateByUrl('/tasks');// Redirige al usuario a la página de tareas.
                    return false;// Bloquea el acceso a la ruta pública.
                }
                return true;// Permite el acceso si el usuario NO está autenticado. 
            })
        );
    };
};