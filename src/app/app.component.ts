import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'formulario';
  form = inject(FormBuilder);
  myform: FormGroup = this.form.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    correo: ['', [Validators.required, Validators.email]],
    Contraseña: ['', [Validators.required, Validators.minLength(8)]],
    Edad: [0, [Validators.required, this.ageValidator(18)]],
    genero: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
  });

  //*
  submit() {
    if (this.myform.invalid) {
      console.log('error');
    }
    console.log('exito');
  }
  //

  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const age = control.value;
      if (age !== null && age < minAge) {
        return { underage: true };
      }
      return null;
    };
  }
  isvalidField(field: string): boolean | null {
    return (
      this.myform.controls[field].errors && this.myform.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myform.controls[field]) return null;

    const errors = this.myform.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return 'Debe tener mínimo 3 letras';
        default:
          return null;
      }
    }
    return null;
  }
}
