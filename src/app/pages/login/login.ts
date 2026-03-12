//login.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Authservice } from '../../services/authservice';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  state = signal('Sign Up');
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  name: FormControl;

  constructor(
    private auth: Authservice,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);

    this.userForm = new FormGroup({
      email: this.email,
      password: this.password,
      name: this.name,
    });
  }
  ngOnInit(): void {
    this.auth.token.subscribe({
      next: (res) => {
        if (res) {
          this.router.navigateByUrl('home');
        }
      },
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
    try {
      if (this.state() === 'Sign Up') {
        this.auth.register(this.userForm.value).subscribe({
          next: (res) => {
            if (res.success && res.token) {
              this.auth.setToken(res.token);
            } else {
              this.toastr.error(res.message);
            }
          },
        });
      } else {
        this.auth.login(this.userForm.value).subscribe((res) => {
          if (res.success && res.token) {
            this.auth.setToken(res.token);
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
}
