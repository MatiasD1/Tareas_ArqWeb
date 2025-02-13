import { inject, Injectable } from "@angular/core";  // Importa 'inject' para inyección de dependencias y '@Injectable' para marcarlo como un servicio.
import { Auth, authState, getAuth, signOut } from "@angular/fire/auth";  // Importa funciones y clases relacionadas con autenticación de Firebase.
import { Observable } from 'rxjs'  // Importa Observable para manejar flujos de datos reactivos.

@Injectable({
    providedIn: 'root',  // Permite que el servicio esté disponible en toda la aplicación sin necesidad de declararlo en módulos.
})
export class AuthStateService {  // Declara la clase del servicio de autenticación.
    
    private _auth = inject(Auth);  // Inyecta la instancia de 'Auth' de Firebase para manejar la autenticación.

    get authState$(): Observable<any> {  // Getter que devuelve un observable con el estado de autenticación del usuario.
        return authState(this._auth);  // 'authState' devuelve un observable que emite el usuario autenticado o null si no hay sesión activa.
    }

    get currentUser() {  // Getter que devuelve el usuario actual de Firebase.
        return getAuth().currentUser;  // Obtiene directamente el usuario autenticado en Firebase (puede ser null si no hay sesión activa).
    }

    logOut() {  // Método para cerrar sesión.
        return signOut(this._auth);  // Llama a 'signOut' de Firebase para cerrar la sesión del usuario actual.
    }
}