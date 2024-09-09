import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
        username: string = '';
        password: string = '';

        login() {
                if (this.username.trim() === '' || this.password.trim() === '') {
                        // Handle empty username or password
                        console.log('Username and password cannot be empty');
                        return;
                }

                // Continue with login logic
                // ...
        }
}
