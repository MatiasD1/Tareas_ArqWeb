import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasEmailError, isRequired } from '../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignUp {
  email: FormControl<string|null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sing-up.component.html',
})
export default class SingUpComponent {

  private _formBuilder = inject(FormBuilder); //construir el formulario
  private _authService = inject(AuthService); //gestionar la autenticacion
  private _router = inject(Router); //manejar la navegacion entre paginas
  
  isRequired(field: 'email' | 'password'){
    return isRequired(field, this.form); 
  }

  hasEmailError(){
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignUp>({ //define los campos del formulario 
      email: this._formBuilder.control('',[Validators.required, Validators.email]),
      password: this._formBuilder.control('',[Validators.required]),
  }); 

  async submit(){
    if(this.form.invalid) return;

    try{
      const {email,password} = this.form.value;

      if( !email || !password) return;

      await this._authService.singUp({email,password}); //llama al servicio de registro de usuario 
    
      toast.success('Usuario creado correctamente');
      this._router.navigateByUrl('/tasks')
    } catch(error){

      toast.error('Ocurrió un error');

    }
    
  }

  async submitWithGoogle(){
    try{
      await this._authService.signInWithGoogle(); //llama al servicio de registro con Google
      toast.success('Bienvenido de nuevo');
      this._router.navigateByUrl('/tasks')
    } catch(error) {
      toast.error('Ocurrió un error');
    }
  }
}
