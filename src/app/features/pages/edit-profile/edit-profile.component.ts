import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service'; // Ajusta la ruta correctamente

@Component({
  selector: 'app-user-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  username: string = '';
  bio: string = '';
  profilePicture: any;
  isOwner: boolean = false;

  constructor(private router: Router, @Inject(SupabaseService) private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.isOwner = this.checkIfOwner();
    this.loadUserProfile();
  }

  // Cargar perfil de usuario desde Supabase
  async loadUserProfile() {
    const userProfile = await this.supabaseService.getUserProfile(this.username); // Solo se pasa el username
    if (userProfile) {
      this.username = this.username; // Esto probablemente se mantenga igual
      this.bio = userProfile.bio; // Asignar biografía
      this.profilePicture = userProfile.profile_picture; // Asignar foto de perfil
    }
  }

  // Cambiar el nombre de usuario
  onUsernameChange(event: any) {
    this.username = event.target.value;
  }

  // Cambiar la biografía
  onBioChange(event: any) {
    this.bio = event.target.value;
  }

  // Seleccionar una nueva foto de perfil
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profilePicture = URL.createObjectURL(file); // Generar una URL para mostrar la imagen
      console.log(this.profilePicture);
    }
  }

  // Guardar cambios del perfil
  async saveProfile(): Promise<void> {
    const success = await this.supabaseService.updateUserProfile(this.username, this.bio, this.profilePicture);
    
    if (success) {
      console.log('Perfil guardado correctamente');
      this.router.navigate(['/user-profile']); // Redirigir al perfil tras guardar los cambios
    } else {
      console.log('Error al guardar el perfil');
    }
  }

  // Redirigir a la gestión de propiedades
  navigateToProperties(): void {
    this.router.navigate(['/user-owner']);
  }

  checkIfOwner(): boolean {
    // Lógica para verificar si el usuario es propietario
    return true; // Cambiar esta lógica dependiendo de cómo determines si es propietario
  }
}
