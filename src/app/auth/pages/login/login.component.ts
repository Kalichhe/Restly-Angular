import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../const/shared.modules';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName: [
      '',
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*$/),
      Validators.pattern(/^\S*$/),
    ],
    password: [
      '',
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(20),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  onLogin() {
    if (!this.loginForm.valid) {
      Swal.fire({
        text: 'Debe diligenciar todos los campos',
        icon: 'error',
      });
      return;
    }

    let userName = this.loginForm.value.userName || '';
    let password = this.loginForm.value.password || '';
    let response = this.userService.login(userName, password);

    if (response.success) {
      this.router.navigateByUrl('/home');
    } else {
      Swal.fire({
        text: response.message,
        icon: 'error',
      });
    }
  }
}
