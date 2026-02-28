import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  state = signal('Sign Up');
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  name: FormControl;

  constructor() {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);

    this.userForm = new FormGroup({
      email: this.email,
      password: this.password,
      name: this.name,
    });
  }

  toggleState() {
    this.state.update((state) => (state === 'Sign Up' ? 'login' : 'Sign Up'));
    if (this.state() === 'login') {
      this.userForm.controls['name'].disable(); // ده اللي هيخلي الزرار يفتح في اللوجن
    } else {
      this.userForm.controls['name'].enable();
    }
  }
  submit() {
    console.log(this.userForm.value);
  }
}
