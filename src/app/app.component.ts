import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { AuthStateService } from './shared/data-access/auth-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
 
}
