import { Component, inject } from "@angular/core";  // Importa Component para definir el componente y inject para inyección de dependencias.
import { RouterModule, Router } from "@angular/router";  // Importa RouterModule para manejar rutas y Router para la navegación.
import { AuthStateService } from "../data-access/auth-state.service";  // Importa el servicio de autenticación.

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-layout',
    template: `
    <header class="h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4"> <!--Encabezado con altura fija y márgenes.-->
    <nav class="flex items-center justify-between h-full">
    <a class="flex items-center text-2xl font-bold text-[#5A3E2B] dark:text-[#F5E8DD]" routerLink="/tasks">
        <img class="w-12 h-10 mr-2" src="https://cdn-icons-png.flaticon.com/256/2677/2677283.png" alt="logo">
        Almacén de Tareas
    </a>
    <button class="focus:outline-none text-white bg-[#9e0039] hover:bg-[#6f0000] focus:ring-4 focus:ring-[#6f0000] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#6f0000] dark:hover:bg-[#9e0039] dark:focus:ring-[#6f0000]" (click)="logOut()">Salir</button>
</nav>

    </header>
    <router-outlet/><!-- Aquí se renderizarán los componentes de las rutas hijas.-->
    `,
})
export default class LayoutComponent {  // Define la clase del componente.
    
    private _authState = inject(AuthStateService);  // Inyecta el servicio de autenticación.
    private _router = inject(Router);  // Inyecta el servicio de navegación.
    
    async logOut() {  // Método para cerrar sesión.
      await this._authState.logOut();  // Llama a la función logOut() del servicio de autenticación.
      this._router.navigateByUrl('/auth/sing-in');  // Redirige a la página de inicio de sesión.
    }
}
