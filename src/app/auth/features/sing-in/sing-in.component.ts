import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasEmailError, isRequired } from '../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

export interface FormSingIn {
  email: FormControl<string|null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sing-in.component.html',
})
export default class SingUpComponent {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService); 
  private _router = inject(Router); 
  isRequired(field: 'email' | 'password'){
    return isRequired(field, this.form); 
  }

  hasEmailError(){
    return hasEmailError(this.form);
  }

    form = this._formBuilder.group<FormSingIn>({
    email: this._formBuilder.control('',[Validators.required, Validators.email]),
    password: this._formBuilder.control('',[Validators.required]),
  }); 

  async submit(){
    if(this.form.invalid) return;

    try{
      const {email,password} = this.form.value;

      if( !email || !password) return;

      await this._authService.singIn({email,password});
    
      toast.success('Hola nuevamente');
      this._router.navigateByUrl('/tasks')
    } catch(error){

      toast.success('Ocurrió un error');

    }
    
  }

  async submitWithGoogle(){
    try{
      await this._authService.signInWithGoogle();
      toast.success('Bienvenido de nuevo');
      this._router.navigateByUrl('/tasks')
    } catch(error) {
      toast.error('Ocurrió un error');
    }
  }
}
