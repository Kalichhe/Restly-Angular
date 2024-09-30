import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  signUpForm = this.fb.group({
    email: ['', Validators.required,],
    userName: [
      '',
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      // Validators.pattern(/^[a-zA-Z0-9]*$/),
    ],
    password: [
      '',
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(20),
    ],
    rePassword: [
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

  onRegister() {
    console.log(this.signUpForm.value);
    if (!this.signUpForm.valid) {
      Swal.fire({
        text: 'Debe diligenciar todos los campos',
        icon: 'error',
      });
      return;
    }

    let userName = this.signUpForm.value.userName || '';
    let email = this.signUpForm.value.email || '';
    let password = this.signUpForm.value.password || '';
    let rePassword = this.signUpForm.value.rePassword || '';

    if (rePassword !== password) {
      Swal.fire({
        text: 'Las contraseñas no coinciden',
        icon: 'error',
      });
      return;
    }

    let response = this.userService.register({ userName, password, email });
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
