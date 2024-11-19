<<<<<<< Updated upstream
import { Component } from '@angular/core';
=======
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { GalleryItem } from '../../interfaces/gallery-item.interface';
import { UserService } from '../../../auth/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Importar Router
>>>>>>> Stashed changes

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
<<<<<<< Updated upstream
  styleUrl: './home.component.css'
=======
  styleUrls: ['./home.component.css'],
>>>>>>> Stashed changes
})
export class HomeComponent {

<<<<<<< Updated upstream
=======
  user;
  profilePhoto = '';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router // Inyectar Router
  ) {
    this.user = this.userService.getUser();
    this.galleryItems.set(this.userService.getGallery(this.user().userName));
    this.profilePhoto = this.userService.getProfile(this.user().userName);
  }

  goToProperties() {
    this.router.navigate(['/properties']);
  }

  onComment(comments: string[]) {
    let htmlContent = 'Aún no hay comentarios, ¡sé el primero!';
    if (comments.length > 0) {
      htmlContent = '<div>';
      comments.forEach((comment) => {
        htmlContent += `<p>${comment}</p>`;
      });
      htmlContent += '</div>';
    }
    Swal.fire({
      html: htmlContent,
    });
  }

  onDelete(id: string) {
    Swal.fire({
      text: '¿Está seguro de eliminar la imagen seleccionada?',
      icon: 'warning',
      iconColor: '#219ebc',
      showCancelButton: true,
      confirmButtonColor: '#023047',
      cancelButtonColor: '#d00000',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.galleryItems.update((items) =>
          items.filter((item) => item.id !== id)
        );
        this.userService.updateGallery(
          this.user().userName,
          this.galleryItems()
        );
        this.posts.update(() => this.galleryItems().length);
      }
    });
  }

  onAddComment(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      return;
    }
    this.galleryItems.update((items) => {
      const selected = items.find((item) => item.id === id);
      if (selected) {
        selected.comments = [...selected.comments, input.value];
      }
      return items;
    });
    this.userService.updateGallery(
      this.user().userName,
      this.galleryItems()
    );
    input.value = '';
  }
>>>>>>> Stashed changes
}
