import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // Definición del modelo de usuario
  user = {
    profileImage: '', // URL de la imagen de perfil
    name: '',
    email: '',
    bio: ''
  };

  constructor(private router: Router) { } // Inyecta el Router aquí

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    // Simulación de carga de datos, reemplaza esto con la llamada a Supabase
    this.user = {
      profileImage: 'https://via.placeholder.com/100', // URL de la imagen
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Este es un texto de biografía de ejemplo. Aquí puedes escribir hasta 200 palabras sobre ti.'
    };
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']); // Navegar a la página de edición de perfil
  }
}
