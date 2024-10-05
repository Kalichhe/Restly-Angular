import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './user-owner.component.html',
  styleUrls: ['./user-owner.component.css']
})
export class OwnerProfileComponent {
  profilePicture: string = ''; // URL de la imagen de perfil
  username: string = ''; // Nombre del usuario
  email: string = ''; // Correo del usuario
  bio: string = ''; // Biografía del usuario

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // Simulación de carga de datos, reemplaza esto con la llamada a Supabase o tu fuente de datos
    this.profilePicture = 'https://via.placeholder.com/100';
    this.username = 'John Doe';
    this.email = 'john@example.com';
    this.bio = 'Este es un texto de biografía de ejemplo.';
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']); // Navegar a la página de edición de perfil
  }

  editProperties(): void {
    this.router.navigate(['/property-management']); // Navegar a la página de gestión de propiedades
  }
}
