import { FormGroup } from '@angular/forms';

export const isRequired = (field: 'email' | 'password', form: FormGroup) => { //field: el nombre del campo (email o password). form: el formulario (FormGroup).

    const control = form.get(field); //busca un control específico dentro del formulario usando el nombre del campo (email o password)

    return control && control.touched && control.hasError('required'); //El control existe (control no es null o undefined). El usuario ha interactuado con él (touched). El control tiene el error 'required', lo que indica que el campo está vacío.
};

export const hasEmailError = (form: FormGroup) => { //Solo trabaja con el campo email (no toma un parámetro field como isRequired). 
    const control = form.get('email'); //Busca el control email en el formulario.
    return control && control?.touched && control.hasError('email'); //Verifica si: El control existe. Ha sido tocado (touched). Tiene el error 'email', lo que significa que el formato del correo es inválido.
}