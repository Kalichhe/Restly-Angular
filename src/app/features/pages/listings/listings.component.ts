import { Component, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { GalleryItem } from '../../interfaces/gallery-item.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../auth/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent {
  galleryItems = signal<GalleryItem[]>([]);
  filteredGalleryItems: GalleryItem[] = [];
  searchQuery: string = '';
  user;
  posts = signal(10);

  constructor(
    private readonly fb: FormBuilder,
    private readonly postsService: PostsService,
    private readonly userService: UserService
  ) {
    this.user = this.userService.getUser();
    this.galleryItems.set(this.userService.getGallery(this.user().userName));
    this.filteredGalleryItems = this.galleryItems(); // Inicializamos la lista filtrada
  }

  // Método llamado por el botón de búsqueda
  onSearch() {
    this.filterGallery(); // Llama a la lógica de filtrado
  }

  // Filtra las imágenes basándose en el texto de búsqueda
  filterGallery() {
    const query = this.searchQuery.toLowerCase();
    this.filteredGalleryItems = this.galleryItems().filter((item) =>
      item.url.toLowerCase().includes(query)
    );
  }

  onDelete(id: string) {
    Swal.fire({
      text: '¿Está seguro de eliminar la imagen seleccionada?',
      icon: 'warning',
      iconColor: '#219ebc',
      showCancelButton: true,
      confirmButtonColor: '#023047',
      cancelButtonColor: '#d00000',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.galleryItems.update((items) =>
          items.filter((item) => item.id !== id)
        );
        this.filteredGalleryItems = this.galleryItems();
        this.userService.updateGallery(
          this.user().userName,
          this.galleryItems()
        );
        this.posts.update(() => this.galleryItems().length);
      }
    });
  }
}