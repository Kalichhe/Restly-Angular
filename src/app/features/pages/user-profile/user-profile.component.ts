import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent implements OnInit {

  // Definición del modelo de usuario
  user = {
    profileImage: '', // URL de la imagen de perfil
    name: '',
    email: '',
    bio: ''
  };

  constructor() { }

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
}
